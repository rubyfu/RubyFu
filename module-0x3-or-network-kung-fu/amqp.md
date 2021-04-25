# AMQP

> The Advanced Message Queuing Protocol \(AMQP\) is an open standard application layer protocol for message-oriented middleware. The defining features of AMQP are message orientation, queuing, routing \(including point-to-point and publish-and-subscribe\), reliability and security.\[1\]

Ref. [Wikipedia](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)

## Client

### With bunny

Gem: [bunny](https://rubygems.org/gems/bunny)

No authenticattion, publish a message:

```ruby
#!/usr/bin/env ruby

require 'bunny'

options = {
  host: '10.10.10.190',
  port: 5672
}
connection = Bunny.new(options)
connection.start

channel = connection.create_channel
exchange = channel.fanout('logs')

message = ARGV.empty? ? 'Hello World!' : ARGV.join(' ')

exchange.publish(message)
puts " [x] Sent #{message}"

connection.close
```

`AMQPLAIN` authentication, direct durable exchange, publish a file retrieved via HTTP:

```ruby
#!/usr/bin/env ruby

require 'bunny'

options = {
  host: '10.0.0.1',
  port: 5672,
  user: 'username',
  password: 'password'
}
connection = Bunny.new(options)
connection.start

channel = connection.create_channel
exchange = channel.direct('my_channel', durable: true)

message = ARGV.empty? ? 'http://127.0.0.1:8080/file.zip' : ARGV.join(' ')

exchange.publish(message)
puts " [x] Sent #{message}"

connection.close
```

Ref.:

* [RabbitMQ - Tutorial 3 - Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-ruby.html)
* [Rawsec - Dyplesher - Write-up - HackTheBox](https://blog.raw.pm/en/HackTheBox-Dyplesher-write-up/#Elevation-of-Privilege-EoP-from-felamos-to-root)

