<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
        <div class="title-wrapper">
        <span class="title"> 녹화장치 정보 </span>
            <span class="addContainer" @click="ShowInsertModal()">
                <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
            </span>
            <span class="addContainer" @click="ShowUpdateModal()">
                <i class="fas fa-pencil-alt" aria-hidden="true"></i>
            </span>
            <span class="addContainer" @click="delRecoInfo(checkedReco)">
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
            </span>
        </div>
        <!-- 추가함 -->
        <span><input type="text" v-model="searchName" placeholder="검색할 서버이름"/></span>
        <div>
            <table class="table1">
                <colgroup>
                <col width="4%">
                <col width="1%">
            </colgroup>
            
                <thead>
                    <tr class="table1-head-title">
                        <th></th>
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> 번호 </strong></td>
                        <td><strong> 서버이름 </strong></td>
                        <td><strong> IP 주소 </strong></td>
                        <td><strong> 업체명 </strong></td>
                    </tr>
                </thead>
                <tbody>                                                                     <!--추가-->
                    <tr v-for="(RecoInfo, i) in RecoInfos" :key="i"  v-if="RecoInfo.name.includes(searchName)" v-bind:class="{'table1-body2' : RecoInfo.name === 'false', 'table1-body1' : RecoInfo.name != 'false'}">
                    <th></th>
                    <td><input type="checkbox" :value="RecoInfo.id" v-model="checkedReco"></td>
                    <td><span> {{ i+1 }}  </span></td>
                    <td><span> {{ RecoInfo.name }} </span></td>
                    <td><span> {{ RecoInfo.ip_address }} </span></td>
                    <td><span> {{ RecoInfo.vendor }} </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <RecoInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRecoInfo()">
    </RecoInsert>

    <RecoUpdate :recoId.sync="recoId" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getRecoInfo()">
    </RecoUpdate>
</div>
</template>

<script>
import RecoInsert from '../device/Modals/RecoInsert';
import RecoUpdate from '../device/Modals/RecoUpdate.vue';

import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },
    updated() {
        this.getRecoInfo()
    },
    mounted() {
        this.getRecoInfo()
    },
    data() {
        return {
            InsertModal: false,
            UpdateModal: false,
            selectAll: false,
            RecoInfos:[],
            checkedReco:[],
            recoId: '',
            //추가
            searchName:''
        }
    },
    methods: {
        checkAll() {
            this.checkedReco = [];
            if(!this.selectAll) {
                for(let i in this.RecoInfos) {
                    this.checkedReco.push(this.RecoInfos[i].id)
                }
            }
        },
        getRecoInfo () {
            this.$http.get('http://localhost:3000/recoding_infos')
            .then((res) => {
                this.RecoInfos = res.data
            })
        },
        delRecoInfo (checkedReco) {
            if(this.checkedReco.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedReco.length; i++)
                {
                    this.$http.delete('http://localhost:3000/recoding_infos/'+checkedReco[i])
                .then((res) => {
                    this.getRecoInfo()
                 })
                }
            }
            
            this.checkedReco = [];
        },
        ShowInsertModal() {
            this.InsertModal = !this.InsertModal;
        },
        ShowUpdateModal() {
            if(0 == this.checkedReco.length)  {
                alert('녹화장치를 선택해주세요.')
            }
            else if (this.checkedReco.length > 1) {
                alert('녹화장치를 하나만 선택해주세요.')
            }
            else {
                this.recoId = this.checkedReco[0];
                this.UpdateModal = !this.UpdateModal;
            }
        }
    },
    components: {
        RecoInsert: RecoInsert,
        RecoUpdate: RecoUpdate,
        SideBar,
    },
}
</script>


<style scoped>
.table1-body1{
      overflow:scroll;
      text-align: center;
      background-color: #eff4f8;
      height: 50px;
      vertical-align: middle;
  }

.table1-body2{
      overflow:scroll;
      text-align: center;
      background-color: red;
      height: 50px;
      vertical-align: middle;
  }
</style>
