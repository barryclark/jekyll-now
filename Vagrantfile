# -*- mode: ruby -*-
# vi: set ft=ruby :

$script_provision = <<SCRIPT
  echo Provisioning...
  
  gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
  curl -sSL https://get.rvm.io | bash -s stable --rails
  source /usr/local/rvm/scripts/rvm
  
  cd /vagrant
  bundle install

  echo "#!/bin/bash"                               >  /usr/local/bin/jekyll-start.sh
  echo "cd /vagrant"                               >> /usr/local/bin/jekyll-start.sh
  echo "source /usr/local/rvm/scripts/rvm"         >> /usr/local/bin/jekyll-start.sh
  echo "bundle exec jekyll serve --force_polling"  >> /usr/local/bin/jekyll-start.sh
  chmod +x                                            /usr/local/bin/jekyll-start.sh
 
  echo Provisioned!!!
SCRIPT

Vagrant.configure("2") do |config|
  # Base box.
  config.vm.box = "xnerv/standard-debian-7.9.0-i386.box"
  
  # Shared folders.
  config.vm.synced_folder "./", "/vagrant"
  
  # Forwarded ports.
  config.vm.network :forwarded_port, guest: 4000, host: 4000

  # Remote access.
  config.ssh.forward_agent = true
  
  # Virtualization provider.
  config.vm.provider :virtualbox do |vb|
    # Don't boot with headless mode.
    vb.gui = false
 
    # Use VBoxManage to customize the VM.
    vb.customize ["modifyvm", :id, "--memory", "512"]
  end

  config.vm.provision "shell", inline: $script_provision, run: "once"
  config.vm.provision "shell", inline: "/usr/local/bin/jekyll-start.sh", run: "always"
end