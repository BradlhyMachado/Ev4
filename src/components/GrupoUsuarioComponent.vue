<template>
  <div class="GrupoUsuario">
    <h2>Grupo de Usuarios</h2>

    <!-- Botón para abrir el modal de creación -->
    <div class="d-flex justify-content-start">
      <b-button @click="showCreateModal" variant="primary">Crear Grupo</b-button>
    </div>

    <!-- Modal de creación de grupo -->
    <b-modal v-model="createModalVisible" title="Crear Grupo">
      <b-form @submit.prevent="creategroup" class="mb-3">
        <b-form-group label="Nombre Grupo" label-for="nombreGrupoInput">
          <b-form-input id="nombreGrupoInput" v-model="newGroup.nombre_grupo" placeholder="Nombre Grupo"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Crear</b-button>
      </b-form>
    </b-modal>

    <b-table :items="paginatedGroup" :fields="fields" striped hover>
      <template #cell(nombre_grupo)="row">
        {{ row.value }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="confirmDelete(row.item)" variant="danger" size="sm">Eliminar</b-button>
      </template>
    </b-table>
    
    <!-- Contenedor del paginador centrado -->
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="groups.length" :per-page="perPage"></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      groups: [],
      newGroup: {
        nombre_grupo: '',
      },
      postURL: 'http://127.0.0.1:5000/grupoUsuario',
      fields: ['nombre_grupo', 'acción'],
      createModalVisible: false,
    };
  },
  methods: {
    showCreateModal() {
      this.createModalVisible = true;
    },
    creategroup() {
      axios
        .put(this.postURL, this.newGroup)
        .then((res) => {
          this.groups.push(res.data);
          console.log(res.data);
          this.resetForm();
          this.fetchgroups();
        })
        .catch((error) => {
          console.log(error);
        });
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
    resetForm() {
      this.newGroup = {
        nombre_grupo: '',
      };
    },
    confirmDelete(group) {
      if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        this.deletegroup(group);
      }
    },
  },
  computed: {
    paginatedGroup() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.groups.slice(startIndex, endIndex);
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

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
