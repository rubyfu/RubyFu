# Telegram API

As we know that Telegram is a messaging app identifies users by their mobile number. Fortenately, Telegram has its own API to interact with it and Ruby has wrapper gem for [Telegram's Bot API](https://core.telegram.org/bots/api).

- To install telegram-bot gem 
```
gem 'telegram-bot-ruby'
```


- Basic usage

As many APIs, you have to get a [token](https://core.telegram.org/bots#botfather) to deal with your bot. Here a basic usage 

```ruby
require 'telegram/bot'

token = 'YOUR_TELEGRAM_BOT_API_TOKEN'

Telegram::Bot::Client.run(token) do |bot|
  bot.listen do |message|
    case message.text
    when '/start'
      bot.api.send_message(chat_id: message.chat.id, text: "Hello, #{message.from.first_name}")
    when '/stop'
      bot.api.send_message(chat_id: message.chat.id, text: "Bye, #{message.from.first_name}")
    end
  end
end
```