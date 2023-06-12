<template>
  <div class="GrupoUsuario">
    <div class="centered">
      <h2>Grupo de Usuarios</h2>
    </div>

    <b-form @submit.prevent="creategroup" class="mb-3">
      <b-row class="no-gutters py-2">
        <b-col cols="3" class="text-right">
          <label for="nombreGrupoInput">Nombre Grupo:</label>
        </b-col>
        <b-col cols="6" class="d-flex align-items-center">
          <b-form-input id="nombreGrupoInput" v-model="newGroup.nombre_grupo" placeholder="Nombre Grupo"></b-form-input>
        </b-col>
        <b-col cols="3" class="d-flex align-items-center justify-content-end">
          <b-button type="submit" variant="primary">Crear</b-button>
        </b-col>
      </b-row>
    </b-form>


    <b-table :items="groups" :fields="fields" striped hover>
      <template #cell(id_grupo)="row">
        {{ row.value }}
      </template>
      <template #cell(nombre_grupo)="row">
        {{ row.value }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="deletegroup(row.item)" variant="danger" size="sm">Eliminar</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      groups: [],
      newGroup: {
        nombre_grupo: '',
      },
      postURL: 'http://127.0.0.1:5000/grupoUsuario',
      fields: ['id_grupo', 'nombre_grupo', 'acción'],
    };
  },
  methods: {
    creategroup() {
      axios
        .put(this.postURL, this.newGroup)
        .then((res) => {
          this.groups.push(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.newGroup = {
        nombre_grupo: '',
      };
    },
    deletegroup(group) {
      axios
        .delete(this.postURL, { data: { id_grupo_usuario: group.id_grupo } })
        .then((res) => {
          console.log(res.data);
          this.fetchgroups();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchgroups() {
      axios
        .post(this.postURL + 's')
        .then((res) => {
          console.log(res);
          this.groups = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchgroups();
  },
};
</script>

<style scoped>
.GrupoUsuario {
  padding: 20px;
}

</style>
