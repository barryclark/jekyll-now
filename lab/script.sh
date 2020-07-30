OPENJDK_URL="https://download.java.net/java/early_access/jdk15/33/GPL/openjdk-15-ea+33_linux-x64_bin.tar.gz"
MAVEN_URL="https://downloads.apache.org/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz"
HELIDON_URL="https://github.com/oracle/helidon-build-tools/releases/download/2.0.2/helidon-cli-linux-amd64"

echo $'\n*** URLs ***\n'
echo "-> $OPENJDK_URL"
echo "-> $MAVEN_URL"
echo "-> $HELIDON_URL"

echo $'\n*** Installing git & Co ***\n'
sudo apt-get update
sudo apt-get install -yq vim-tiny nano git

echo $'\n*** Install OpenJDK 15… ***\n'
mkdir -p $HOME/soft && curl $OPENJDK_URL --output $HOME/soft/openjdk-15.tar.gz
cd ~/soft && tar -xzvf $HOME/soft/openjdk-15.tar.gz
sudo update-alternatives --install "/usr/bin/java" "java" "$HOME/soft/jdk-15/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "$HOME/soft/jdk-15/bin/javac" 1
export JAVA_HOME=$HOME/soft/jdk-15
echo "JAVA_HOME=$HOME/soft/jdk-15" >> $HOME/.profile
java -version

echo $'\n*** Installing Maven… ***\n'
curl $MAVEN_URL --output $HOME/soft/maven.gz
cd ~/soft && tar -xzvf maven.gz
export PATH=$HOME/soft/apache-maven-3.6.3/bin:$PATH
echo "PATH=$HOME/soft/apache-maven-3.6.3/bin:$PATH" >> $HOME/.profile

echo $'\n*** Installing Helidon CLI… ***\n'
curl -L $HELIDON_URL --output $HOME/soft/helidon && chmod +x $HOME/soft/helidon
export PATH=$HOME/soft:$PATH
echo "PATH=$HOME/soft:$PATH" >> $HOME/.profile
cd $HOME
