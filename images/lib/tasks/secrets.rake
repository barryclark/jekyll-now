namespace :secrets do
  desc 'decrypt secrets and store in .env'
  task :decrypt do
    puts "Loading secrets.."
    # Read encrypted secrets from .env.secret
    env_secret_file = File.open('.env.secret', 'rb')
    env_secret = env_secret_file.read
    env_secret_file.close

    # Set cipher to decryption mode
    decipher = OpenSSL::Cipher::AES256.new(:CBC)
    decipher.decrypt

    # Set decryption key from environment or prompt
    if key = ENV['ENV_KEY']
      decipher.key = key
    else
      while true do
        key = IO.console.getpass('Secrets key (Empty to skip): ')
        begin
          decipher.key = key
          ENV['ENV_KEY'] = key
          break
        rescue OpenSSL::Cipher::CipherError
          puts 'Incorrect key.'
        end
      end
    end

    # Set public decryption IV
    env_iv_file = File.open('.env.iv', 'rb')
    env_iv = env_iv_file.read
    env_iv_file.close
    decipher.iv = env_iv

    # Decrypt secrets file and write to environment variables
    env_plain = "#{decipher.update(env_secret)}#{decipher.final}"
    env_plain_file = File.open('.env', 'wb')
    env_plain_file.write(env_plain)
    env_plain_file.close

    puts "Secrets written to .env"
end

  desc 'encrypt secrets and writes them to env.secret'
  task :encrypt do
    # Fetch plaintext secrets from .env.yml
    env_plain_file = File.open('.env', 'rb')
    env_plain = env_plain_file.read
    env_plain_file.close

    # Set cipher to encryption mode and provide key/IV
    cipher = OpenSSL::Cipher::AES256.new(:CBC)
    cipher.encrypt
    while true
      begin
        cipher.key = IO.console.getpass('Secrets key: ')
        break
      rescue OpenSSL::Cipher::CipherError
        puts "Invalid key. Key must be 32 characters."
      end
    end
    iv = cipher.random_iv

    # IV is public and stored at .env.iv
    env_iv_file = File.open('.env.iv', 'wb')
    env_iv_file.write(iv)
    env_iv_file.close

    # Encrypt secrets and store at .env.secret
    env_encrypted = "#{cipher.update(env_plain)}#{cipher.final}"
    env_secret_file = File.open('.env.secret', 'wb')
    env_secret_file.write(env_encrypted)
    env_secret_file.close

    puts 'Encrypted to .env.secret'
  end
end
