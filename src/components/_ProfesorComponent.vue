<template>
  <div class="Profesores">
    <h2>Profesores</h2>

    <b-form v-if="!editingProfesor" @submit.prevent="createProfesor" class="mb-3">
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
        <b-form-input id="contraseñaInput" v-model="newProfesor.usuario_contraseña" placeholder="Contraseña"
          type="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Ruta" label-for="rutaInput">
        <b-form-input id="rutaInput" v-model="newProfesor.usuario_ruta" placeholder="Ruta"></b-form-input>
      </b-form-group>


      <b-form-group label="Ruta" label-for="rutaInput">
        <b-form-file
          v-model="file"
          accept=".jpg, .jpeg, .png"
          @change="onFileChange"
          placeholder="Seleccionar imagen"
          drop-placeholder="Arrastra y suelta la imagen aquí"
          browse-text="Examinar"
        ></b-form-file>
      </b-form-group>


      <b-button type="submit" variant="primary">Crear</b-button>
    </b-form>

    <b-form v-else @submit.prevent="updateProfesor(editingProfesor)" class="mb-3">
      <b-form-group label="DNI" label-for="profesor_dni">
        <b-form-input id="profesor_dni" v-model="editingProfesor.profesor_dni" placeholder="DNI" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="Nombre" label-for="nombre">
        <b-form-input id="nombre" v-model="editingProfesor.nombre" placeholder="Nombre"></b-form-input>
      </b-form-group>
      <b-form-group label="Apellido" label-for="apellidos">
        <b-form-input id="apellidos" v-model="editingProfesor.apellidos" placeholder="Apellido"></b-form-input>
      </b-form-group>
      <b-form-group label="Teléfono" label-for="telefonoInput">
        <b-form-input id="telefonoInput" v-model="editingProfesor.telefono" placeholder="Teléfono"></b-form-input>
      </b-form-group>
      <b-form-group label="Correo" label-for="correoInput">
        <b-form-input id="correoInput" v-model="editingProfesor.correo" placeholder="Correo"></b-form-input>
      </b-form-group>
      <b-form-group label="Contraseña" label-for="contraseñaInput">
        <b-form-input id="contraseñaInput" v-model="editingProfesor.contraseña" placeholder="Contraseña"
          type="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Ruta" label-for="rutaInput">
        <b-form-input id="rutaInput" v-model="editingProfesor.ruta" placeholder="Ruta"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Actualizar</b-button>
      <b-button @click="cancelEdit" variant="secondary">Cancelar</b-button>
    </b-form>

    <b-table :items="profesores" :fields="fields" striped hover>
      <template #cell(usuario_dni)="row">
        {{ row.item.usuario_dni }}
      </template>
      <template #cell(usuario_nombre)="row">
        {{ row.item.usuario_nombre }}
      </template>
      <template #cell(usuario_apellidos)="row">
        {{ row.item.usuario_apellido }}
      </template>
      <template #cell(usuario_telefono)="row">
        {{ row.item.usuario_telefono }}
      </template>
      <template #cell(usuario_correo)="row">
        {{ row.item.usuario_correo }}
      </template>
      <template #cell(usuario_ruta)="row">
        {{ row.item.usuario_ruta }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="editProfesor(row.item)" variant="info" size="sm">Editar</b-button>
        <b-button @click="deleteProfesor(row.item)" variant="danger" size="sm">Eliminar</b-button>
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
        usuario_ruta: '',
      },
      postURL: 'http://127.0.0.1:5000/profesor',
      fields: ['profesor_dni', 'nombre', 'apellidos', 'telefono', 'correo', 'ruta', 'acción'],
      editingProfesor: null,
    };
  },
  methods: {
    createProfesor() {
      axios
        .put(this.postURL, this.newProfesor)
        .then((res) => {
          this.profesores.push(res.data);
          console.log(res.data);
          this.resetForm();
          this.fetchProfesores();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfesor(profesor) {
      const transformedProfesor = {
        usuario_dni: profesor.profesor_dni,
        usuario_nombre: profesor.nombre,
        usuario_apellido: profesor.apellidos,
        usuario_telefono: profesor.telefono,
        usuario_correo: profesor.correo,
        usuario_contraseña: profesor.contraseña,
        usuario_ruta: profesor.ruta,
      };
      axios
        .patch(this.postURL, transformedProfesor)
        .then((res) => {
          console.log(res.data);
          this.fetchProfesores();
          this.cancelEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editProfesor(profesor) {
      this.editingProfesor = { ...profesor };
    },
    cancelEdit() {
      this.editingProfesor = null;
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
    resetForm() {
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
