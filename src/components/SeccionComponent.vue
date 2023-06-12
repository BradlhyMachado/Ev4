<template>
  <div class="Seccion">
    <h2>Secciones</h2>

    <!-- Botón para abrir el modal de creación -->
    <div class="d-flex justify-content-start">
      <b-button @click="showCreateModal" variant="primary">Crear Sección</b-button>
    </div>

    <!-- Modal de creación de seccion -->
    <b-modal v-model="createModalVisible" title="Crear Sección">
      <b-form @submit.prevent="createSeccion" class="mb-3">
        <b-form-group label="Nombre Sección" label-for="nombreSeccionInput">
          <b-form-input id="nombreSeccionInput" v-model="newSeccion.nombre_seccion"
            placeholder="Nombre Sección"></b-form-input>
        </b-form-group>
        <b-form-group label="Id Curso" label-for="idCursoInput">
          <b-form-input id="idCursoInput" v-model="newSeccion.id_curso" placeholder="Id Curso"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Crear</b-button>
      </b-form>
    </b-modal>

    <!-- Modal de edición de seccion -->
    <b-modal v-if="editingSeccion" v-model="editModalVisible" title="Editar Sección">
      <b-form @submit.prevent="updateSeccion(editingSeccion)" class="mb-3">
        <b-form-group label="Nombre Sección" label-for="nombreSeccionInput">
          <b-form-input id="nombreSeccionInput" v-model="editingSeccion.nombre_seccion" placeholder="Nombre Sección"></b-form-input>
        </b-form-group>
        <b-form-group label="Id Curso" label-for="idCursoInput">
          <b-form-input id="idCursoInput" v-model="editingSeccion.id_curso" placeholder="Id Curso"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Actualizar</b-button>
        <b-button @click="cancelEdit" variant="secondary">Cancelar</b-button>
      </b-form>
    </b-modal>

    <b-table :items="paginatedSeccion" :fields="fields" striped hover>
      <template #cell(nombre_seccion)="row">
        {{ row.value }}
      </template>
      <template #cell(curso)="row">
        {{ row.value }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="editSeccion(row.item)" variant="info" size="sm">Editar</b-button>
        <b-button @click="deleteSeccion(row.item)" variant="danger" size="sm">Eliminar</b-button>
      </template>
    </b-table>

    <!-- Contenedor del paginador centrado -->
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="seccion.length" :per-page="perPage"></b-pagination>
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
      seccion: [],
      newSeccion: {
        nombre_seccion: '',
        id_curso: ''
      },
      postURL: 'http://127.0.0.1:5000/seccion',
      fields: ['nombre_seccion', 'curso', 'acción'],
      editingSeccion: null,
      createModalVisible: false,
      editModalVisible: false
    };
  },
  methods: {
    showCreateModal() {
      this.createModalVisible = true;
    },
    createSeccion() {
      axios
        .put(this.postURL, this.newSeccion)
        .then((res) => {
          this.seccion.push(res.data);
          console.log(res.data);
          this.resetForm();
          this.fetchSeccion();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showEditModal(seccion) {
      this.editingSeccion = { ...seccion };
      this.editModalVisible = true;
    },
    cancelEdit() {
      this.editModalVisible = false;
      this.editingSeccion = null;
    },
    updateSeccion(seccion) {
      const transformedseccion = {
        id_seccion: seccion.id_seccion,
        nombre_seccion: seccion.nombre_seccion,
        id_curso: seccion.id_curso
      };
      axios
        .patch(this.postURL, transformedseccion)
        .then((res) => {
          console.log(res.data);
          this.fetchSeccion();
          this.cancelEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editSeccion(seccion) {
      this.showEditModal(seccion);
    },


    deleteSeccion(Seccion) {
      axios
        .delete(this.postURL, { data: { id_seccion: Seccion.id_seccion } })
        .then((res) => {
          console.log(res.data);
          this.fetchSeccion();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchSeccion() {
      axios
        .post(this.postURL + 's')
        .then((res) => {
          console.log(res);
          this.seccion = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.newSeccion = {
        nombre_grupo: '',
      };
    },
  },
  computed: {
    paginatedSeccion() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.seccion.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchSeccion();
  },
};
</script>

<style scoped>
.Seccion {
  padding: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
