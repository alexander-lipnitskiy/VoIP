<template>
  <div>
    <el-row>
      <el-col>
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="create">Create</el-radio-button>
          <el-radio-button label="open">Open</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row :gutter="24" v-if="labelPosition == 'create'">
      <el-col :span="12">
        <el-input v-model="name" placeholder="database name" />
      </el-col>
      <el-col :span="4">
        <el-button v-on:click="createDB">Create database</el-button>
      </el-col>
      <el-col :span="10">{{identity}}</el-col>
    </el-row>
    <el-row :gutter="24" v-if="labelPosition == 'open'">
      <el-col :span="12">
        <el-input v-model="address" placeholder="database address" />
      </el-col>
      <el-col :span="4">
        <el-button v-on:click="openDBConnection">Open database</el-button>
        
      </el-col>
      <el-col :span="6" >
        <el-button v-on:click="disconnect">Disconnect</el-button>
        
      </el-col>
    </el-row>
    <div v-if="identity">
          <p>Identity Details:</p>
          <p>Type: {{identity.type}}</p>
          <p>ID: {{identity.id}}</p>
          <p>Public Key: {{identity.publicKey}}</p>
          <p>Signature ID: {{identity.signatures.id}}</p>
          <p>Signature Public Key:{{identity.signatures.publicKey}}</p>
          
          </div>
    {{resCreateDB}}
    <br />
    <div>Loading db into memory:</div>
    <el-progress
      :percentage="parseInt((progress/total) * 100)"
      :text-inside="true"
      :stroke-width="26"
    ></el-progress>
    <el-progress
      :percentage="parseInt((replicationProgress/replicationTotal) * 100)"
      :text-inside="true"
      :stroke-width="26"
    ></el-progress>
    <div>{{isDatabaseReady ? 'ready' : progress + '/' + total}}</div>
    <div>{{replicationProgress}}/{{replicationTotal}}</div>
    <br />ready logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in ready">{{ item }}</li>
    </ul>replicate logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in replicate">{{ item }}</li>
    </ul>replicated logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in replicated">{{ item }}</li>
    </ul>replicatep logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in replicatep">{{ item }}</li>
    </ul>load logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in load">{{ item }}</li>
    </ul>peer logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in peer">{{ item }}</li>
    </ul>loadp logs
    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in loadp">{{ item }}</li>
    </ul>write logs
    <el-table :data="tableWrite" style="width: 100%">
      <el-table-column prop="id" label="Hash" width="180"></el-table-column>
      <el-table-column prop="op" label="Operation" width="180"></el-table-column>
      <el-table-column prop="type" label="Type"></el-table-column>
      <el-table-column prop="identity" label="Identity"></el-table-column>
    </el-table>

    <ul id="example-1">
      <li v-bind:key="index" v-for="(item, index) in closed">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  created() {},

  data() {
    return {
      labelPosition: "open",
      name: "test",
      address:
        "/orbitdb/zdpuAzATtt12ua6feThEVGKd6bLs5PV6RzBxCYSXcjawgYwf3/sdsafdsg",
      ready: [],
      replicate: [],
      replicated: [],
      replicatep: [],
      load: [],
      peer: [],
      loadp: [],
      write: [],
      tableWrite: [],
      closed: [],
      socket: null,
      progress: 0,
      total: 1,
      replicationProgress: 0,
      replicationTotal: 1,
      isDatabaseReady: false,
      resCreateDB: null,
      identity: null
    };
  },
  methods: {
    listen() {
      console.log(this.write);
      this.socket = io("http://localhost:4200");
      var vm = this;
      this.socket.on("connect", function() {
        console.log(vm.socket.connected);
        vm.socket.on("ready", function(msg) {
          console.log("ready");
          vm.ready.push(msg);
          vm.isDatabaseReady = true;
          console.log(msg);
        });
        vm.socket.on("replicate", function(msg) {
          console.log("replicate");
          vm.replicate.push(msg);
          console.log(msg);
        });
        vm.socket.on("replicated", function(msg) {
          console.log("replicated");
          vm.replicated.push(msg);

          console.log(msg);
        });
        vm.socket.on("replicatep", function(msg) {
          console.log("1");
          vm.replicatep.push(msg);
          const item = JSON.parse(msg);
          vm.replicationProgress = item.progress;
          vm.replicationTotal = item.have;
          console.log(msg);
        });
        vm.socket.on("load", function(msg) {
          console.log("load");
          vm.load.push(msg);
          console.log(msg);
        });

        vm.socket.on("peer", function(msg) {
          console.log("peer");
          vm.peer.push(msg);
          console.log(msg);
        });
        vm.socket.on("loadp", function(msg) {
          console.log("loadp");
          const item = JSON.parse(msg);
          vm.progress = item.progress;
          vm.total = item.total;
          vm.loadp.push(msg);
          console.log(msg);
        });
        vm.socket.on("write", msg => {
          vm.write.push(msg);
          const item = JSON.parse(msg);
          vm.tableWrite.unshift({
            id: item.hash.hash,
            op: item.hash.payload.op,
            type: item.hash.payload.value.resourceType,
            identity: item.hash.identity.publicKey
          });
        });
        vm.socket.on("closed", function(msg) {
          console.log("closed");
          vm.closed.push(msg);
          vm.isDatabaseReady = false;
          console.log(msg);
        });
        vm.socket.on("error", error => {
          console.log(error);
        });
        vm.socket.on("connect_error", error => {
          console.log(error);
        });
      });

      this.socket.on("event", function(data) {
        console.log(data);
      });
      this.socket.on("disconnect", function() {
        console.log("disconnect");
      });
    },
    createDB: async function(event) {
      const response = await fetch(`http://0.0.0.0:4000/orbitdb/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: this.name })
      });

      // this.loading = false;

      if (!response.ok) {
        // this.error = response.statusText;
      } else {
        const res = await response.json();
        this.resCreateDB = res;

        if (this.resCreateDB.isCreated) {
          this.listen();
        }
      }
    },

    openDBConnection: async function(event) {
      const response = await fetch(`http://0.0.0.0:4000/orbitdb/open`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: this.address })
      });

      // this.loading = false;

      if (!response.ok) {
        // this.error = response.statusText;
      } else {
        const res = await response.json();
        console.log(res);
        this.listen();
        await this.getIdentity();
      }
    },

    disconnect: async function(event) {
      const response = await fetch(`http://0.0.0.0:4000/orbitdb/disconnect`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      // this.loading = false;

      if (!response.ok) {
        // this.error = response.statusText;
      } else {
        const res = await response.json();
        console.log(res);
        this.ready = [];
        this.replicate = [];
        this.replicated = [];
        this.replicatep = [];
        this.load = [];
        this.peer = [];
        this.loadp = [];
        this.write = [];
        this.tableWrite = [];
        this.closed = [];
        this.socket = null;
        this.progress = 0;
        this.total = 1;
        this.replicationProgress = 0;
        this.replicationTotal = 1;
      }
    },

    getIdentity: async function() {
      const response = await fetch("http://0.0.0.0:4000/orbitdb/identity", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      // this.loading = false;

      if (!response.ok) {
        // this.error = response.statusText;
      } else {
        const res = await response.json();
        this.identity = res;
      }
    }
  }
};
</script>

<style scoped>
.el-col {
  margin-bottom: 3px;
}
</style>