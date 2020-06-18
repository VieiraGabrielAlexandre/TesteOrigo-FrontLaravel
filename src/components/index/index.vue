<template>
  <b-container class="gray p-2" >

    <b-row>

      <b-col cols="12">

          <div class="wrapper-box" > 
          <b-form @submit.prevent="onSubmit()" novalidate>
            
            <b-row>

              <b-col cols="12" md="4">
                <b-form-group label="Nome" label-for="name">
                  <b-form-input id="name" v-model="data.name" type="text" name="name" :state="submit ? !errors.has('name') : null" v-validate="'required'" autocomplete="off" placeholder="Nome completo"></b-form-input>
                  <b-form-invalid-feedback :state="submit ? !errors.has('name') : null">
                    Por favor, preencha o nome.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="4">
                <b-form-group label="E-mail" label-for="email">
                  <b-form-input id="email" v-model="data.email" type="text" name="email" :state="submit ? !errors.has('email') : null" v-validate="'required|email'"  autocomplete="off" placeholder="exemplo@exemplo.com"></b-form-input>
                  <b-form-invalid-feedback :state="submit ? !errors.has('email') : null">
                    Por favor, preencha o e-mail.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="4">
                <b-form-group label="Plano" label-for="plan">
                  <b-form-select id="plan" v-model="data.plan_id" :options="plans" name="plan" :state="submit ? !errors.has('plan') : null" v-validate="'required'" ></b-form-select>
                </b-form-group>
                <b-form-invalid-feedback :state="submit ? !errors.has('plan') : null">
                    Por favor, selecione o plano.
                  </b-form-invalid-feedback>
              </b-col>

            
              </b-row>

              <b-row>

                 <b-col cols="12" md="3">
                  <b-form-group label="Telefone" label-for="telephone">
                    <b-form-input id="telephone" v-model="data.telephone" type="text" name="telephone" v-mask="'(##) ####-####'" :state="submit ? !errors.has('telephone') : null" v-validate="'required'" autocomplete="off" placeholder="(99) 9999-9999"></b-form-input>
                    <b-form-invalid-feedback :state="submit ? !errors.has('telephone') : null">
                      Por favor, preencha o telefone.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              
                <b-col cols="12" md="3">
                  <b-form-group label="Nascimento" label-for="born_date">
                    <b-form-input id="born_date" v-model="data.born_date" type="date" name="born_date" :state="submit ? !errors.has('born_date') : null" v-validate="'required'" autocomplete="off"></b-form-input>
                    <b-form-invalid-feedback :state="submit ? !errors.has('born_date') : null">
                      Por favor, preencha seu nascimento.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="4">
                  <b-form-group label="Cidade" label-for="city">
                    <b-form-input id="city" v-model="data.city" type="text" name="city" :state="submit ? !errors.has('city') : null" v-validate="'required'" autocomplete="off" placeholder="Nome da cidade"></b-form-input>
                    <b-form-invalid-feedback :state="submit ? !errors.has('city') : null">
                      Por favor, preencha o da cidade.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="2">
                  <b-form-group label="Estado" label-for="state">
                    <b-form-input id="state" v-model="data.state" type="text" name="state" :state="submit ? !errors.has('state') : null" v-validate="'required'" autocomplete="off" placeholder="Nome do estado"></b-form-input>
                    <b-form-invalid-feedback :state="submit ? !errors.has('state') : null">
                      Por favor, preencha o nome do estado.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

              </b-row>

              <b-row class="justify-content-end p-3">
                <b-button type="submit" class="btn-green">{{ update ? 'Salvar' : 'Criar'}}</b-button>
              </b-row>
          </b-form>
          </div>
           
      </b-col>
    </b-row>

    <b-row class="justify-content-end mt-3">

      <b-col cols="12">
          <b-container fluid>
            <!-- HEADER -->
            <b-row class="table-header mt-1">
              <b-col cols="3">
                Nome 
              </b-col>

              <b-col cols="1" class="text-center">
                Idade
              </b-col>

              <b-col cols="3" class="text-center">
                E-mail
              </b-col>

              <b-col cols="2" class="text-center">
                Estado
              </b-col>

              <b-col cols="1" class="text-center">
                Plano
              </b-col>

              <b-col cols="2" class="text-center">
                Ações
              </b-col>
            </b-row>
            <!-- END HEADER -->


            <!-- BODY -->
            <template  v-if="clients.length > 0 && !loading">
              <b-row class="table-body" v-for="item in clients" :key="item.id">
                <b-col cols="3">
                  <div class="title"> {{ item.name.length > 20 ? item.name.substr(0, 20) + '...' : item.name }}</div>
                </b-col>

                <b-col cols="1" class="text-center">
                  {{ item.born_date | date }}
                </b-col>

                <b-col cols="3" class="text-center">
                  {{ item.email }}
                </b-col>

                <b-col cols="2" class="text-center">
                  {{ item.state }}
                </b-col>

                <b-col cols="1" class="text-center">
                  {{ item.plans[0].name }}
                </b-col>

                <b-col cols="2" class="text-center">
                  <span class="action text-info p-2" @click="loadToEdit(item)">
                    <font-awesome-icon icon="edit"/>
                  </span>
                  <span class="action text-danger p-2" @click="openRemoveModal(item)">
                    <font-awesome-icon icon="times"/>
                  </span>
                </b-col>

              </b-row>
            </template>

            <b-row v-if="clients.length == 0 && loading" class="py-5 my-5 justify-content-center align-items-center">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </b-row>

            <b-row v-if="!loading && clients.length == 0" class="table-body justify-content-center">
              <b-alert show>Nenhum cliente encontrado.</b-alert>
            </b-row>

            <!-- END BODY -->
      </b-container>
 </b-col>
</b-row>

<!-- Modals -->
<!-- Remove -->
<b-modal id="bv-modal-remove" >

    <div class="d-block text-center modal-message">
      Deseja realmente excluir o cadastro?
    </div>

    <template v-slot:modal-footer>
      <b-row>
          <b-button class="mr-2 btn-red" @click="removeUser">Sim</b-button>
          <b-button class="btn-green" @click="closeRemoveModal">Não</b-button>
      </b-row>
    </template>
</b-modal>

<!-- Error -->
<b-modal id="bv-modal-error" >

    <div class="d-block text-center modal-message">
      Esse usuário não pode excluído pois tem um plano Free e mora em São Paulo.
    </div>

    <template v-slot:modal-footer>
      <b-row>
          <b-button class="btn-green" @click="closeErrorModal">Ok</b-button>
      </b-row>
    </template>
</b-modal>

<!-- Added -->
<b-modal id="bv-modal-success" >

    <div class="d-block text-center modal-message">
      Cadastrado com Sucesso!
    </div>

    <template v-slot:modal-footer>
      <b-row>
          <b-button class="mr-2 btn-green" @click="closeSuccessModal">Ok</b-button>
      </b-row>
    </template>
</b-modal>

  </b-container>
</template>
<script>
import ClientService from "@/services/resources/ClientService";
import PlanService from "@/services/resources/PlanService";
import moment from "moment";

const serviceClient = ClientService.build();
const servicePlan = PlanService.build();

export default {
  data () {
    return {
      data: {
        name: '',
        email: '',
        telephone: '',
        city: '',
        state: '',
        born_date: '',
        plan_id: null
      },
      user: {},
      update: false,
      submit: false,
      loading: false,
      plans: [
        {value: null, text: 'Selecione o plano'}
      ],
      clients: []
    }
  },
  filters:{
    date(date){
      return moment().diff(moment(date, "YYYY-MM-DD"), 'years');
    }
  },
  methods: {
    tabSelect(newTabIndex){
      if(newTabIndex == 0)
        this.fetchActiveUsers();
      else
        this.fetchDeleteUsers();
    },
    onSubmit(){
      
        this.submit = true;
        this.$validator.validateAll().then((result) => {
          
          if(result){

              this.loading = true;
      
              if(this.update){ // Update user

                this.data.id = this.user.id;

                serviceClient
                .update(this.data)
                .then(response => {
                  this.loading = false;
                  this.update = false;     
                  this.cleanFields();             
                })
                .catch(err => {
                  this.loading = false;
                });
              }else{ // Create user

              serviceClient
                .create(this.data)
                .then(response => {
                  this.loading = false;
                  this.openSuccessModal();
                  this.fetchClients();
                  this.cleanFields();             
                })
                .catch(err => {
                  this.loading = false;
                });
              }

                  
          }
        });
    },
    cleanFields(){
      this.data ={
        name: '',
        email: '',
        telephone: '',
        city: '',
        state: '',
        born_date: ''
      };
      this.submit = false;
    },
    loadToEdit(item){
      this.update = true;
      this.user = item;
      this.data = item;
    },
    openSuccessModal(){
      this.$bvModal.show('bv-modal-success');
    },
    closeSuccessModal(){
      this.$bvModal.hide('bv-modal-success');
    },
    openErrorModal(){
      this.$bvModal.show('bv-modal-error');
    },
    closeErrorModal(){
      this.$bvModal.hide('bv-modal-error');
    },
    openRemoveModal(item){
      this.user = item;
      this.$bvModal.show('bv-modal-remove');
    },
    closeRemoveModal(){
      this.$bvModal.hide('bv-modal-remove');
    },
    removeUser(){
      
        this.loading = true;

        let data = {
          id: this.user.id
        };
      
        serviceClient
          .destroy(data)
          .then(response => {
            this.closeRemoveModal();
            this.loading = false;
            this.$delete(this.clients, this.clients.indexOf(this.user));  
          })
          .catch(err => {
            this.loading = false;
            this.closeRemoveModal();
            this.openErrorModal();
          });      
    },
    fetchClients(){
        this.activeUsers = [];
        this.loading = true;
      
        serviceClient
          .search()
          .then(response => {
            this.loading = false;
            this.clients = response;
            
          })
          .catch(err => {
            this.loading = false;
          });
              
    },
    fetchPlans(){
      
        servicePlan
          .search()
          .then(response => {
            response.forEach(element => {
              this.plans.push({value: element.id, text: element.name});
            });
            
          })
          .catch(err => {
            this.loading = false;
          });
              
    },
  },
  mounted(){
    this.fetchPlans();
    this.fetchClients();
  }

}
</script>

<style lang="scss">
@import '../../assets/scss/variables.scss';

// Modals

.modal-message{
  font-size: 18px;
}

.btn-red{
  display: inline-block;
  border-radius: 5px;
  padding: 7px 20px;
  border: 1px $base-red solid;
  width: auto;
  color: #fff;
  background: $base-red;
  cursor: pointer;

  &:hover{
    background: #fff;
    color: $base-red;
    border: 1px $base-red solid;
  }
}

.btn-green{
  display: inline-block;
  border-radius: 5px;
  padding: 7px 20px;
  border: 1px $base-color solid;
  width: auto;
  color: #fff;
  background: $base-color;
  cursor: pointer;

  &:hover{
    background: #fff;
    color: $base-color;
    border: 1px $base-color solid;
  }
}

.tab-header{
  background: #fff;
  padding: 10px;
  border: 1px #ddd solid;
  border-radius: 5px;

  .nav-item a{
    color: #78909C;
    font-weight: 500;
    font-size: 15px;
  }
}
.tab-header-item-active{
  color: $base-color !important;
  border-bottom: 3px $base-color solid;
}

.table-header{
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  color: #888;
  background: #fff; 
  border-bottom: 1px #ddd solid;
}

.table-body{
  padding: 10px 0;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  color: #455A64;

  .title{
    font-size: 1.1em;
    font-weight: bold;
  }


  .action{
    font-size: 22px;
    cursor: pointer;
  }
}


.wrapper-box{
  background: #fff;
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 25px;


  form{
    label{
      color: #666;
      font-size: 0.9em;
    }
  }

  

}


</style>