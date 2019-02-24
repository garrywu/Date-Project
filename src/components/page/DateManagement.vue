<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 查询用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
				<el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd()">新增记录</el-button>
			</div>
			<el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="mmname" label="男方姓名" sortable width="150">
				</el-table-column>
				<el-table-column prop="mfname" label="女方姓名" width="120">
				</el-table-column>
				<el-table-column prop="mstarttime" label="起始时间">
				</el-table-column>
				<el-table-column prop="mendtime" label="终止时间">
				</el-table-column>
				<el-table-column prop="datestatus" label="相亲状态">
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="新增记录" :visible.sync="addVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="男方姓名" width="20%">
					<el-input width="30%" v-model="form.mmname"></el-input>
				</el-form-item>
				<el-form-item label="女方姓名" width="20%">
					<el-input width="30%" v-model="form.mfname"></el-input>
				</el-form-item>
				<el-form-item label="起始时间" width="20%">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.mstarttime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="终止时间" width="20%">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.mendtime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="相亲状态">
					<el-select v-model="form.datestatus" placeholder="请选择">
						<el-option key="active" label="进行中" value="active"></el-option>
						<el-option key="failed" label="失败" value="failed"></el-option>
						<el-option key="success" label="成功" value="success"></el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="男方姓名" width="20%">
					<el-input width="30%" v-model="form.mmname"></el-input>
				</el-form-item>
				<el-form-item label="女方姓名" width="20%">
					<el-input width="30%" v-model="form.mfname"></el-input>
				</el-form-item>
				<el-form-item label="起始时间" width="20%">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.mstarttime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="终止时间" width="20%">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.mendtime" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="相亲状态">
					<el-select v-model="form.datestatus" placeholder="请选择">
						<el-option key="active" label="进行中" value="active"></el-option>
						<el-option key="failed" label="失败" value="failed"></el-option>
						<el-option key="success" label="成功" value="success"></el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		padding-left: 60px;
		width: 50%;
	}

	.ai-search {
		display: block;
		margin-left: 1.125rem;
		margin-top: 3.75rem
	}
</style>

<script>
	export default {
		name: 'datemanagement',
		data() {
			return {
				//url: './vuetable.json',
				tableData: [],
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				del_list: [],
				is_search: false,
				editVisible: false,
				delVisible: false,
				addVisible: false,
				form: {
					mmname: '',
					mfname: '',
					mstarttime: '',
					mendtime: '',
					datestatus: ''
				},
				idx: -1
			}
		},
		created() {
			this.getData();
		},
		computed: {
			data() {
				return this.tableData.filter((d) => {
					let is_del = false;
					for (let i = 0; i < this.del_list.length; i++) {
						if (d.mmname === this.del_list[i].mmname) {
							is_del = true;
							break;
						}
					}
					if (!is_del) {
						if (d.mmname.indexOf(this.select_word) > -1 ||
							d.mfname.indexOf(this.select_word) > -1 ||
							d.datestatus.indexOf(this.select_word) > -1) {
							return d;
						}
					}
				})
			}
		},
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.cur_page = val;
				this.getData();
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
				if (process.env.NODE_ENV === 'development') {
					// this.url = '/ms/query/list';
					this.url = 'https://www.easy-mock.com/mock/5c6c0a072be418020f2f8198/example/ms/query/date';
				};
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					this.tableData = res.data.date;
				})
			},
			search() {
				this.is_search = true;
			},
			formatter(row, column) {
				return row.address;
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			handleEdit(index, row) {
				this.idx = index;
				const item = this.tableData[index];
				this.form = {
					mmname: item.mmname,
					mfname: item.mfname,
					mstarttime: item.mstarttime,
					mendtime: item.mendtime,
					datestatus: item.datestatus
				}
				this.editVisible = true;
			},
			handleAdd() {
				this.addVisible = true;
			},
			handleDelete(index, row) {
				this.idx = index;
				this.delVisible = true;
			},
			delAll() {
				const length = this.multipleSelection.length;
				let str = '';
				this.del_list = this.del_list.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error('删除了' + str);
				this.multipleSelection = [];
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 保存编辑
			saveEdit() {
				this.$set(this.tableData, this.idx, this.form);
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx+1} 行成功`);
			},
			// 确定删除
			deleteRow() {
				this.tableData.splice(this.idx, 1);
				this.$message.success('删除成功');
				this.delVisible = false;
			}
		}
	}
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.del-dialog-cnt {
		font-size: 16px;
		text-align: center
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}
</style>
