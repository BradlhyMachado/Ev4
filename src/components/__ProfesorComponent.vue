<template>
  <div class="Profesores">
    <h2>Profesores</h2>

    <b-form @submit.prevent="createProfesor" class="mb-3">
      <b-form-group label="DNI" label-for="dniInput">
        <b-form-input id="dniInput" v-model="newProfesor.usuario_dni" placeholder="DNI"></b-form-input>
      </b-form-group>
      <b-form-group label="Nombre" label-for="nombreInput">
        <b-form-input id="nombreInput" v-model="newProfesor.usuario_nombre" placeholder="Nombre"></b-form-input>
      </b-form-group>
      <b-form-group label="Apellido" label-for="apellidoInput">
        <b-form-input id="apellidoInput" v-model="newProfesor.usuario_apellido" placeholder="Apellido"></b-form-input>
      </b-form-group>
      <b-form-group label="Teléfono" label-for="telefonoInput">
        <b-form-input id="telefonoInput" v-model="newProfesor.usuario_telefono" placeholder="Teléfono"></b-form-input>
      </b-form-group>
      <b-form-group label="Correo" label-for="correoInput">
        <b-form-input id="correoInput" v-model="newProfesor.usuario_correo" placeholder="Correo"></b-form-input>
      </b-form-group>
      <b-form-group label="Contraseña" label-for="contraseñaInput">
        <b-form-input id="contraseñaInput" v-model="newProfesor.usuario_contraseña" placeholder="Contraseña" type="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Ruta" label-for="rutaInput">
        <b-form-input id="rutaInput" v-model="newProfesor.usuario_ruta" placeholder="Ruta"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Crear</b-button>
    </b-form>

    <b-table :items="profesores" :fields="fields" striped hover>
      <template #cell(profesor_dni)="row">
        {{ row.item.profesor_dni }}
      </template>
      <template #cell(usuario_nombre)="row">
        {{ row.item.nombre }}
      </template>
      <template #cell(usuario_apellidos)="row">
        {{ row.item.apellidos }}
      </template>
      <template #cell(actions)="row">
        <b-button v-if="editingProfesor !== row.item" @click="editProfesor(row.item)" variant="primary" size="sm">Edit</b-button>
        <b-button v-else @click="updateProfesor(row.item)" variant="success" size="sm">Save</b-button>
        <b-button v-if="editingProfesor === row.item" @click="cancelEdit" variant="secondary" size="sm">Cancel</b-button>
        <b-button @click="deleteProfesor(row.item)" variant="danger" size="sm">x</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profesores: [],
      newProfesor: {
        usuario_dni: '',
        usuario_nombre: '',
        usuario_apellido: '',
        usuario_telefono: '',
        usuario_correo: '',
        usuario_contraseña: '',
        usuario_ruta: ''
      },
      postURL: 'http://127.0.0.1:5000/profesor',
      fields: ['profesor_dni', 'nombre', 'apellidos', 'actions'],
    };
  },
  methods: {
    createProfesor() {
      axios
        .put(this.postURL, this.newProfesor)
        .then((res) => {
          this.profesores.push(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.newProfesor = {
        usuario_dni: '',
        usuario_nombre: '',
        usuario_apellido: '',
        usuario_telefono: '',
        usuario_correo: '',
        usuario_contraseña: '',
        usuario_ruta: ''
      };
    },
    deleteProfesor(profesor) {
      
      axios
        .delete(this.postURL, { data: { dni: profesor.profesor_dni } })
        .then((res) => {
          console.log(res.data);
          this.fetchProfesores();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfesor(profesor) {
      axios
        .patch(this.postURL, profesor)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchProfesores() {
      axios
        .post(this.postURL + 's')
        .then((res) => {
          console.log(res);
          this.profesores = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    editProfesor(profesor) {
      this.editingProfesor = profesor;
    },

    cancelEdit() {
      this.editingProfesor = null;
    },

    clearForm() {
      this.newProfesor = {
        usuario_dni: '',
        usuario_nombre: '',
        usuario_apellido: '',
        usuario_telefono: '',
        usuario_correo: '',
        usuario_contraseña: '',
        usuario_ruta: '',
      };
    },
  },
  created() {
    this.fetchProfesores();
  },
};
</script>

<style scoped>
.Profesores {
  padding: 20px;
}
</style>
