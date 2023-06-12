<template>
    <div class="tasks">
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.usuario_dni">
          {{ user.usuario_nombre }} - {{ user.usuario_apellido }}
          <button @click="deleteUser(user)">x</button>
        </li>
      </ul>
  
      <form @submit.prevent="createUser">
        <input type="text" v-model="newUser.usuario_nombre" placeholder="Nombre" />
        <input type="text" v-model="newUser.usuario_apellido" placeholder="Apellido" />
        <input type="text" v-model="newUser.usuario_dni" placeholder="DNI" />
        <input type="text" v-model="newUser.usuario_telefono" placeholder="Teléfono" />
        <input type="text" v-model="newUser.usuario_correo" placeholder="Correo electrónico" />
        <input type="password" v-model="newUser.usuario_contraseña" placeholder="Contraseña" />
        <input type="text" v-model="newUser.usuario_id_grupo_usuario" placeholder="ID Grupo Usuario" />
        <input type="text" v-model="newUser.usuario_vector" placeholder="Vector" />
        <input type="text" v-model="newUser.usuario_ruta" placeholder="Ruta" />
        <button type="submit">Crear</button>
      </form>
      <br />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        newUser: {
          usuario_nombre: '',
          usuario_apellido: '',
          usuario_dni: '',
          usuario_telefono: '',
          usuario_correo: '',
          usuario_contraseña: '',
          usuario_id_grupo_usuario: '',
          usuario_vector: '',
          usuario_ruta: '',
        },
        postURL: 'http://127.0.0.1:5000/usuario',
      };
    },
    methods: {
      createUser() {
        axios
          .put(this.postURL, this.newUser)
          .then((res) => {
            this.users.push(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
  
        this.newUser = {
          usuario_nombre: '',
          usuario_apellido: '',
          usuario_dni: '',
          usuario_telefono: '',
          usuario_correo: '',
          usuario_contraseña: '',
          usuario_id_grupo_usuario: '',
          usuario_vector: '',
          usuario_ruta: '',
        };
      },
      deleteUser(user) {
        axios
          .delete(this.postURL, { data: { usuario_dni: user.usuario_dni } })
          .then((res) => {
            this.users = this.users.filter((u) => u.usuario_dni !== user.usuario_dni);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      fetchUsers() {
        axios
          .post(this.postURL + 's')
          .then((res) => {
            console.log(res);
            this.users = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style
  