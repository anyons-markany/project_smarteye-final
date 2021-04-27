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
                <tbody>
                    <tr class="table1-body" v-for="(RecoInfo, i) in RecoInfos" :key="i" >
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

import axios from 'axios';


export default {
    components:{
        SideBar
    },
    updated() {
        // this.getRecoInfo()
    },
    created() {
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
            if(this.RecoInfos.length > 0) {
                this.RecoInfos = [];
            }
            axios.get('http://localhost:8888/api/recoding/list')
            .then((res) => {
                this.RecoInfos = res.data.data
            })

            console.log(this.RecoInfos);
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
</style>
