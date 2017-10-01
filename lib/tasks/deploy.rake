# use SSHKit directly instead of Capistrano
require 'sshkit'
require 'sshkit/dsl'
include SSHKit::DSL

# set the identifier used to tag Docker images
deploy_tag = ENV['DEPLOY_TAG']

# set the name of the environment we are deploying to (e.g. staging, production, etc.)
deploy_env = ENV['DEPLOY_ENV']

# set the key used to decrypt the environment variables secret file into .env
env_key = ENV['ENV_KEY']

# set the location on the server of where we want files copied to and commands executed from
deploy_path = ENV['DEPLOY_PATH']

app_name = ENV['APP_NAME']

# connect to server
server = SSHKit::Host.new hostname: ENV['SERVER_HOST'], user: ENV['SERVER_USER'], password: ENV['SERVER_PASS']

namespace :deploy do
  desc 'copy to server files needed to run and manage Docker containers'
  task :configs do
    on server do
      upload! File.expand_path('../../docker-compose.yml', __dir__), deploy_path
      upload! File.expand_path('../../docker-compose.production.yml', __dir__), deploy_path
      upload! File.expand_path('../../nginx.conf', __dir__), deploy_path
      upload! File.expand_path('../../nginx.upstream.conf', __dir__), deploy_path
    end
  end
end

namespace :docker do
  desc 'logs into Docker Hub for pushing and pulling'
  task :login do
    on server do
      within deploy_path do
        execute 'docker', 'login', '-e' , ENV['DOCKER_EMAIL'], '-u', ENV['DOCKER_USER'], '-p', "'#{ENV['DOCKER_PASS']}'"
      end
    end
  end

  desc 'pulls images from Docker Hub'
  task pull: 'docker:login' do
    on server do
      within deploy_path do
        with deploy_tag: deploy_tag do
          execute 'docker', 'pull', "#{ENV['DOCKER_USER']}/#{ENV['APP_NAME']}:#{deploy_tag}"
        end
      end
    end
  end

  desc 'Decrypt the latest environment variables to .env'
  task decrypt: 'deploy:configs' do
    on server do
      within deploy_path do
        with rails_env: deploy_env, deploy_tag: deploy_tag, env_key: env_key do
          execute 'docker-compose', '-f', 'docker-compose.yml', '-f', 'docker-compose.production.yml', 'run', 'app', 'rake', 'secrets:decrypt'
        end
      end
    end
  end

  desc 'stops all Docker containers via Docker Compose'
  task stop: 'deploy:configs' do
    on server do
      within deploy_path do
        with rails_env: deploy_env, deploy_tag: deploy_tag do
          execute 'docker-compose', '-f', 'docker-compose.yml', '-f', 'docker-compose.production.yml', 'down'
        end
      end
    end
  end

  desc 'starts all Docker containers via Docker Compose'
  task start: 'deploy:configs' do
    on server do
      within deploy_path do
        with rails_env: deploy_env, deploy_tag: deploy_tag do
          execute 'docker-compose', '-f', 'docker-compose.yml', '-f', 'docker-compose.production.yml', 'up', '-d'

          # Remove the old image and write the new deploy tag to a log file
          execute 'docker', 'rmi', "danreynolds/#{app_name}:$(cat deploy.tag)"
          execute 'echo', deploy_tag , '>', 'deploy.tag'
        end
      end
    end
  end

  desc 'pulls images, stops old containers and starts new containers'
  task deploy: %w{docker:pull docker:decrypt docker:stop docker:start} # pull images manually to reduce down time
end
