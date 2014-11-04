Search: Node/Express/ElasticSearch
==================================

A service that accepts JSON documents as data, and then provides an interface to search
and give aggregated results on the data.

For example, the caller sends JSON documents that look like

<code>
    {'favoriteBeer': 'Heineken', 'name': 'John Smith', 'numCommits': 200, 'os': 'Mac OS X', 'programmingLanguage': 'Go'}
</code>

and would like to subsequently find out information about engineer trends.


What are the most common `programming languages`?
How about `programming languages` where engineers hack on `Macs`?
And what kinds of `beer` do `Go` developers drink?


The service provides an HTTP endpoint and accept and return JSON to any requests.

###Steps to Run in Linux:
++++++++++++++++++++++

**update packages:**
>sudo apt-get update

**install nodejs:**
>sudo apt-get install git nodejs
>sudo update-alternatives --install /usr/bin/node nodejs /usr/bin/nodejs 100

**install npm**
>curl https://www.npmjs.org/install.sh | sudo sh

**install elastic search:**
>sudo apt-get install openjdk-7-jdk
>java -version
>wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.3.4.deb
>sudo dpkg -i elasticsearch-1.3.4.deb
>sudo /etc/init.d/elasticsearch start
>curl -X GET 'http://localhost:9200'

**clone the node application and install dependencies**
>git clone https://github.com/ejiro/NodeSearch.git
>cd NodeSearch; npm install

**start the application (be_ip is the elastis search internal backend ip, fe_ip is the internal frontend ip)**
>nohup node app.js --be_ip <be_ip> --fe_ip <fe_ip> &


**if your be_ip and fe_ip and set to localhost, then app should be available at:**
<pre>
http://localhost:8080/search?terms={}
http://localhost:8080/index?terms={}
</pre>