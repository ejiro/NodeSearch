###Search: Node/Express/Jade/ElasticSearch
###========================================

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

####Steps to Run in Linux/Unix Environment:
####++++++++++++++++++++++++++++++++++++++

**Update linux/unix packages:**
<pre>
$ sudo apt-get update
</pre>

**Install nodejs:**
<pre>
$ sudo apt-get install git nodejs
$ sudo update-alternatives --install /usr/bin/node nodejs /usr/bin/nodejs 100
</pre>

**Install node package manager**
<pre>
$ curl https://www.npmjs.org/install.sh | sudo sh
</pre>

**Install elastic search:**
<pre>
$ sudo apt-get install openjdk-7-jdk
$ java -version
$ wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.3.4.deb
$ sudo dpkg -i elasticsearch-1.3.4.deb
$ sudo /etc/init.d/elasticsearch start
$ curl -X GET 'http://localhost:9200'
</pre>

**Clone the node application and install dependencies**
<pre>
$ git clone https://github.com/ejiro/NodeSearch.git
$ cd NodeSearch; npm install
</pre>

**Start the application (be_ip is the elastis search internal backend ip, fe_ip is the internal frontend ip)**
<pre>
$ nohup node app.js --be_ip <be_ip> --fe_ip <fe_ip> &
</pre>


####Indexing and Searching Documents:
####++++++++++++++++++++++++++++++++++++++

**App should be available at your external ip (eg localhost if developing locally):**
<pre>
http://external_ip:8080/search?terms={}
http://external_ip:8080/index?terms={}
</pre>


####Extras (Optional) Commands:
####++++++++++++++++++++++++++++++++++++++
Check if node is installed and Running as well as killing node process
<pre>
$ node -v
$ ps aux | grep node
$ killall node
</pre>

Indexing and Searching and Deleting document directly from elastic search
See more at: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/docs.html
<pre>
curl -XPUT 'http://be_ip:9200/index/type/id' -d '{}'
curl -XGET 'http://be_ip:9200/index/type/id'
curl -XDELETE 'http://be_ip:9200/index/type/id'
</pre>