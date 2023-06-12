<template>
  <div class="Participacion">
    <h2>Participaciones</h2>

    <!-- Botón para abrir el modal de creación -->
    <div class="d-flex justify-content-start">
      <b-button @click="showCreateModal" variant="primary">Crear Participación</b-button>
    </div>

    <!-- Modal de creación de Participacion -->
    <b-modal v-model="createModalVisible" title="Crear Sección">
      <b-form @submit.prevent="createParticipacion" class="mb-3">
        <b-form-group label="Nota Final" label-for="notaFinalInput">
          <b-form-input id="notaFinalInput" v-model="newParticipacion.nota_final" placeholder="Nota Final"></b-form-input>
        </b-form-group>
        <b-form-group label="Id Horario" label-for="idHorarioInput">
          <b-form-input id="idHorarioInput" v-model="newParticipacion.id_horario" placeholder="Id Horario"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Crear</b-button>
      </b-form>
    </b-modal>

    <!-- Modal de edición de Participacion -->
    <b-modal v-if="editingParticipacion" v-model="editModalVisible" title="Editar Sección">
      <b-form @submit.prevent="updateParticipacion(editingParticipacion)" class="mb-3">
        <b-form-group label="Nota Final" label-for="notaFinalInput">
          <b-form-input id="notaFinalInput" v-model="editingParticipacion.nota_final" placeholder="Nota Final"></b-form-input>
        </b-form-group>
        <b-form-group label="Id Horario" label-for="idHorarioInput">
          <b-form-input id="idHorarioInput" v-model="editingParticipacion.id_horario" placeholder="Id Horario"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Actualizar</b-button>
        <b-button @click="cancelEdit" variant="secondary">Cancelar</b-button>
      </b-form>
    </b-modal>

    <b-table :items="paginatedParticipacion" :fields="fields" striped hover>
      <template #cell(nota_final)="row">
        {{ row.value }}
      </template>
      <template #cell(id_horario)="row">
        {{ row.value }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="editParticipacion(row.item)" variant="info" size="sm">Editar</b-button>
        <b-button @click="deleteParticipacion(row.item)" variant="danger" size="sm">Eliminar</b-button>
      </template>
    </b-table>

    <!-- Contenedor del paginador centrado -->
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="Participacion.length" :per-page="perPage"></b-pagination>
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
      Participacion: [],
      newParticipacion: {
        nombre_Participacion: '',
        id_horario: ''
      },
      postURL: 'http://127.0.0.1:5000/participacion',
      fields: ['nota_final', 'id_horario', 'acción'],
      editingParticipacion: null,
      createModalVisible: false,
      editModalVisible: false
    };
  },
  methods: {
    showCreateModal() {
      this.createModalVisible = true;
    },
    createParticipacion() {
      axios
        .put(this.postURL, this.newParticipacion)
        .then((res) => {
          this.Participacion.push(res.data);
          console.log(res.data);
          this.resetForm();
          this.fetchParticipacion();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showEditModal(Participacion) {
      this.editingParticipacion = { ...Participacion };
      this.editModalVisible = true;
    },
    cancelEdit() {
      this.editModalVisible = false;
      this.editingParticipacion = null;
    },
    updateParticipacion(Participacion) {
      const transformedParticipacion = {
        id_participacion: Participacion.id_participacion,
        nota_final: Participacion.nota_final,
        id_horario: Participacion.id_horario
      };
      axios
        .patch(this.postURL, transformedParticipacion)
        .then((res) => {
          console.log(res.data);
          this.fetchParticipacion();
          this.cancelEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editParticipacion(Participacion) {
      this.showEditModal(Participacion);
    },


    deleteParticipacion(Participacion) {
      axios
        .delete(this.postURL, { data: { id_participacion: Participacion.id_participacion } })
        .then((res) => {
          console.log(res.data);
          this.fetchParticipacion();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchParticipacion() {
      axios
        .post(this.postURL + 's')
        .then((res) => {
          console.log(res);
          this.Participacion = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.newParticipacion = {
        nombre_grupo: '',
      };
    },
  },
  computed: {
    paginatedParticipacion() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.Participacion.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchParticipacion();
  },
};
</script>

<style scoped>
.Participacion {
  padding: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
