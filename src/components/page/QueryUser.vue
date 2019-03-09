<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 查询用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
				<el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="search" @click="search">搜索</el-button>
			</div>
			<el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-row>
							<el-col :span="22">
								<el-form label-position="left" inline class="demo-table-expand">
									<el-form-item label="性别">
										<span>{{ props.row.usersex }}</span>
									</el-form-item>
									<el-form-item label="出生地">
										<span>{{ props.row.birthlocation }}</span>
									</el-form-item>
									<el-form-item label="职位">
										<span>{{ props.row.jobtitle }}</span>
									</el-form-item>
									<el-form-item label="联系方式">
										<span>{{ props.row.mobile }}</span>
									</el-form-item>
									<el-form-item label="年薪">
										<span>{{ props.row.salary }}</span>
									</el-form-item>
									<el-form-item label="房产数量">
										<span>{{ props.row.housenumber }}</span>
									</el-form-item>
									<el-form-item label="个人爱好">
										<span>{{ props.row.hobby }}</span>
									</el-form-item>
									<el-form-item label="是否离异">
										<span>{{ props.row.divorce }}</span>
									</el-form-item>
									<el-form-item label="个性描述"> <span>{{ props.row.charactor }}</span>
									</el-form-item>
									<el-form-item label="相亲要求"> <span>{{ props.row.requirement }}</span>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="2">
									<el-button class=ai-search size='small' type="success" @click="aiSearch">进行AI匹配</el-button>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="birthdate" label="出生日期" sortable width="150">
				</el-table-column>
				<el-table-column prop="username" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="address" label="住址" :formatter="formatter">
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

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="40%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="姓名" width="40%">
					<el-input width="30%" v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="居住地" width="40%">
					<el-input width="30%" v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="form.usersex" placeholder="请选择">
						<el-option key="male" label="男" value="male"></el-option>
						<el-option key="female" label="女" value="female"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="出生地">
					<el-input width="30%" v-model="form.birthlocation"></el-input>
				</el-form-item>

				<el-form-item label="职位">
					<el-input width="30%" v-model="form.jobtitle"></el-input>
				</el-form-item>
				<el-form-item label="公司名称">
					<el-input width="30%" v-model="form.worklocation"></el-input>
				</el-form-item>
				<el-form-item label="年薪">
					<el-input width="30%" v-model="form.salary"></el-input>
				</el-form-item>
				<el-form-item label="房产数量">
					<el-select v-model="form.housenumber" placeholder="请选择">
						<el-option key="1" label="1" value="1"></el-option>
						<el-option key="2" label="2" value="2"></el-option>
						<el-option key="3" label="3" value="3"></el-option>
						<el-option key="4" label="4" value="4"></el-option>
						<el-option key="5" label="5" value="5"></el-option>
						<el-option key="5+" label="多于5套" value="5+"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="个人爱好">
					<el-input width="30%" v-model="form.hobby"></el-input>
				</el-form-item>
				<el-form-item width="30%" label="是否离异">
					<el-switch v-model="form.divorce"></el-switch>
				</el-form-item>
				<el-form-item label="个性描述">
					<el-input type="textarea" rows="5" v-model="form.charactor"></el-input>
				</el-form-item>
				<el-form-item label="相亲要求">
					<el-input type="textarea" rows="5" v-model="form.requirement"></el-input>
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
		name: 'queryuser',
		data() {
			return {
				url: './vuetable.json',
				tableData: [],
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				del_list: [],
				is_search: false,
				editVisible: false,
				delVisible: false,
				form: {
					username: '',
					birthdate: '',
					address: ''
				},
				idx: -1,
				delname:'',
				delmobile:''
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
						if (d.username === this.del_list[i].username) {
							is_del = true;
							break;
						}
					}
					if (!is_del) {
						if (d.username.indexOf(this.select_word) > -1 ||
							d.address.indexOf(this.select_word) > -1 ||
							d.birthdate.indexOf(this.select_word) > -1) {
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
					this.url = 'https://www.easy-mock.com/mock/5c6c0a072be418020f2f8198/example/ms/query/list';
				};
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					this.tableData = res.data.list;
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
					name: item.name,
					date: item.date,
					address: item.address
				}
				this.editVisible = true;
			},
			handleDelete(index, row) {
				this.idx = index;
				this.delVisible = true;
				this.delname = row.username;
				this.delmobile = row.mobile;
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
				axios.post('/user', {
						username:this.delname,
						mobile: this.delmobile
					})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			aiSearch(){
				this.$router.push({
					name: 'QueryResult',
					params: { cal: 'ais' }
				})
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
