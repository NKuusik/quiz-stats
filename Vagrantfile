Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.network :private_network, ip: "192.168.56.0"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
    # Disable the default share of the current code directory. Doing this
  # provides improved isolation between the vagrant box and your host
  # by making sure your Vagrantfile isn't accessible to the vagrant box.
  # If you use this you may want to enable additional shared subfolders as
  # shown above.
end

