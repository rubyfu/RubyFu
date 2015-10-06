# Email


## Sending Email
**sendmail.rb**
```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
#
require 'net/smtp'

def send_mail(smtpsrv, username, password, frmemail, dstemail)

  msg  = "From: #{frmemail}\n"
  msg += "To: #{dstemail}\n"
  msg += "Date: #{date}\n"
  msg += "Subject: Email Subject\n"
  msg += "Content-type: text/html\n\n"
  msg += "<strong>winter is coming<br>Hi Jon Snow, Please click to win!</strong>"

  begin
    Net::SMTP.start(smtpsrv, 25, 'localhost', username, password, :login) do |smtp|
      smtp.send_message msg, frmemail, dstemail
    end
    puts "[+] Email has been sent successfully!"
  rescue Exception => e
    puts "[!] Failed to send the mail"
    puts e
  end
  
end

smtpsrv  = ARGV[0]
username = "admin@attacker.zone"
password = "P@ssw0rd"
frmemail = "admin@attacker.zone"
dstemail = "JonSnow@victim.com"

smtpsrv = ARGV[0]
if smtpsrv.nil?
  puts "[!] IP address Missing \nruby #{__FILE__}.rb [IP ADDRESS]\n\n"
  exit 0
end

send_mail smtpsrv, username, password, frmemail, dstemail
```

## Reading Email
**readmail.rb**
```ruby
#!/usr/bin/env ruby
# KING SABRI | @KINGSABRI
# 
require 'net/imap'

host = ARGV[0]
if host.nil?
  puts "[!] IP address Missing \nruby #{__FILE__}.rb [IP ADDRESS]\n\n"
  exit 0
end

username = ARGV[1] || "admin@attacker.zone"
password = ARGV[2] || "P@ssw0rd"

imap = Net::IMAP.new(host, 993, true, nil, false)
imap.login(username, password)
imap.select('INBOX')

mail_ids = imap.search(['ALL'])

# Read all emails 
mail_ids.each do |id|
  envelope = imap.fetch(id, "ENVELOPE")[0].attr["ENVELOPE"]
  puts "[+] Reading message, Subject: #{envelope.subject}"
  puts imap.fetch(id,'BODY[TEXT]')[0].attr['BODY[TEXT]']
end

# Delete all emails 
# mail_ids.each do |id|
#   envelope = imap.fetch(id, "ENVELOPE")[0].attr["ENVELOPE"]
#   puts "[+] Deleting message, Subject: #{envelope.subject}"
#   imap.store(id, '+FLAGS', [:Deleted]) # Deletes forever No trash!
# end

imap.close
imap.logout
imap.disconnect
```



<br><br><br>
---
- [More useful mail operation example | alvinalexander.com](http://alvinalexander.com/search/node/ruby%20mail)
