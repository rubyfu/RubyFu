# Telegram API

As we know that Telegram is a messaging app identifies users by their mobile number. Fortunately, Telegram has its own API -*Ruby has wrapper gem for* [*Telegram's Bot API*](https://core.telegram.org/bots/api)- which allows you to Integrate with other services, create custom tools, build single- and multiplayer games, build social services, do virtually anything else; Do you smell any thing evil here? 

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
