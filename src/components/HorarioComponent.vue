<template>
  <div class="Horario">
    <h2>Horarios</h2>

    <!-- Botón para abrir el modal de creación -->
    <div class="d-flex justify-content-start">
      <b-button @click="showCreateModal" variant="primary">Crear Horario</b-button>
    </div>

    <!-- Modal de creación de horario -->
    <b-modal v-model="createModalVisible" title="Crear Horario">
      <b-form @submit.prevent="createHorario" class="mb-3">
        <b-form-group label="Dia Semana" label-for="diaSemanaInput">
          <!-- <b-form-input id="diaSemanaInput" v-model="newHorario.dia_semana" placeholder="Dia Semana"></b-form-input> -->
          <b-form-select id="diaSemanaInput" v-model="newHorario.dia_semana" :options="diasSemana" placeholder="Día Semana"></b-form-select>
        </b-form-group>
        <b-form-group label="Hora Inicio" label-for="horaInicioInput">
          <!-- <b-form-input id="horaInicioInput" v-model="newHorario.hora_inicio" placeholder="Hora Inicio"></b-form-input> -->
          <b-form-timepicker id="horaInicioInput" v-model="newHorario.hora_inicio" placeholder="Hora Inicio"></b-form-timepicker>
        </b-form-group>
        <b-form-group label="Hora Fin" label-for="horaFinInput">
          <!-- <b-form-input id="horaFinInput" v-model="newHorario.hora_fin" placeholder="Hora Fin"></b-form-input> -->
          <b-form-timepicker id="horaFinInput" v-model="newHorario.hora_fin" placeholder="Hora Fin"></b-form-timepicker>
        </b-form-group>
        <b-form-group label="Id Seccion" label-for="idSeccionInput">
          <b-form-input id="idSeccionInput" v-model="newHorario.id_seccion" placeholder="Id Seccion"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Crear</b-button>
      </b-form>
    </b-modal>

    <!-- Modal de edición de horario -->
    <b-modal v-if="editingHorario" v-model="editModalVisible" title="Editar Horario">
      <b-form @submit.prevent="updateHorario(editingHorario)" class="mb-3">
        <b-form-group label="Dia Semana" label-for="diaSemanaInput">
          <b-form-select id="diaSemanaInput" v-model="editingHorario.dia_semana" :options="diasSemana" placeholder="Dia Semana"></b-form-select>
        </b-form-group>
        <b-form-group label="Hora Inicio" label-for="horaInicioInput">
          <b-form-timepicker id="horaInicioInput" v-model="editingHorario.hora_inicio" placeholder="Hora Inicio"></b-form-timepicker>
        </b-form-group>
        <b-form-group label="Hora Fin" label-for="horaFinInput">
          <b-form-timepicker id="horaFinInput" v-model="editingHorario.hora_fin" placeholder="Hora Fin"></b-form-timepicker>
        </b-form-group>
        <b-form-group label="Id Seccion" label-for="idSeccionInput">
          <b-form-input id="idSeccionInput" v-model="editingHorario.id_seccion" placeholder="Id Seccion"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Actualizar</b-button>
        <b-button @click="cancelEdit" variant="secondary">Cancelar</b-button>
      </b-form>
    </b-modal>

    <b-table :items="paginateHorario" :fields="fields" striped hover>
      <template #cell(dia_semana)="row">
        {{ row.value }}
      </template>
      <template #cell(hora_inicio)="row">
        {{ row.value }}
      </template>
      <template #cell(hora_fin)="row">
        {{ row.value }}
      </template>
      <template #cell(id_seccion)="row">
        {{ row.value }}
      </template>
      <template #cell(acción)="row">
        <b-button @click="editHorario(row.item)" variant="info" size="sm">Editar</b-button>
        <b-button @click="deleteHorario(row.item)" variant="danger" size="sm">Eliminar</b-button>
      </template>
    </b-table>

    <!-- Contenedor del paginador centrado -->
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="horario.length" :per-page="perPage"></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      diasSemana: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      currentPage: 1,
      perPage: 5,
      horario: [],
      newHorario: {
        dia_semana: '',
        hora_inicio: '',
        hora_fin : '',
        id_seccion : ''
      },
      postURL: 'http://127.0.0.1:5000/horario',
      fields: ['dia_semana', 'hora_inicio', 'hora_fin', 'id_seccion', 'acción'],
      editingHorario: null,
      createModalVisible: false,
      editModalVisible: false
    };
  },
  methods: {
    showCreateModal() {
      this.createModalVisible = true;
    },
    createHorario() {
      axios
        .put(this.postURL, this.newHorario)
        .then((res) => {
          this.horario.push(res.data);
          console.log(res.data);
          this.resetForm();
          this.fetchhorario();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showEditModal(horario) {
      this.editingHorario = { ...horario };
      this.editModalVisible = true;
    },
    cancelEdit() {
      this.editModalVisible = false;
      this.editingHorario = null;
    },
    updateHorario(horario) {
      const transformedhorario = {
        id_horario: horario.id_horario,
        dia_semana: horario.dia_semana,
        hora_inicio: horario.hora_inicio,
        hora_fin: horario.hora_fin,
        id_seccion: horario.id_seccion
      };
      axios
        .patch(this.postURL, transformedhorario)
        .then((res) => {
          console.log(res.data);
          this.fetchhorario();
          this.cancelEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editHorario(horario) {
      this.showEditModal(horario);
    },


    deleteHorario(horario) {
      axios
        .delete(this.postURL, { data: { id_horario: horario.id_horario } })
        .then((res) => {
          console.log(res.data);
          this.fetchhorario();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchhorario() {
      axios
        .post(this.postURL + 's')
        .then((res) => {
          console.log(res);
          this.horario = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.newHorario = {
        nombre_grupo: '',
      };
    },
  },
  computed: {
    paginateHorario() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.horario.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchhorario();
  },
};
</script>

<style scoped>
.Horario {
  padding: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
