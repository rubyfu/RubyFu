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



