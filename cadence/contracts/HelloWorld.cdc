pub contract HelloWorld {

  pub var greeting: String

  access(all)
  fun changeGreeting(newGreeting: String) {
    self.greeting = newGreeting
  }

  init() {
    self.greeting = "Hello, World!"
  }
}
