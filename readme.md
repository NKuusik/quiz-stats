Webpack setup based on: https://www.freecodecamp.org/news/learn-webpack-for-react-a36d4cac5060/

Requires Yarn: https://yarnpkg.com/

1. If you're using Vagrant, use the following configuration:


        Vagrant.configure("2") do |config|
            config.vm.box = "ubuntu/focal64"
            config.vm.network :private_network, ip: "10.10.10.61"
            config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
        end

And run "yarn vagrant".

2. If you're not using vagrant, run "yarn start".

Diagram model for key classes:

![Class Diagram](https://github.com/NKuusik/quiz-stats/blob/master/models/base-classes.png)