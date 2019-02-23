<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> AI匹配结果</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!-- 			<el-form>
			<el-form-item v-model="form.username">
			</el-form-item>
			</el-form> -->
			<p>当前匹配用户为: {{ username }}</p>
			<br />
			<div width='100%'>
				<el-row :span="24">
					<el-col :span="11">
						<div class="wait-for-search" >
							<div style="width:50%;display: block;margin: 0rem auto; padding-top: 70px;">
								<i class="el-icon-lx-peoplefill" style="font-size: 300px; color: white;"></i>
								<el-button type="primary" icon="el-icon-edit" style="font-size: 30px;">选择用户进行匹配</el-button>
							</div>
						</div>
					</el-col>
					<el-col :span="2">
						<div style="width: 100%;">&nbsp;</div>
					</el-col>
					<el-col :span="11">
						<div class="wait-for-result" >
							<div style="width:50%;display: block;margin: 0rem auto; padding-top: 70px;">
								<i class="el-icon-lx-group" style="font-size: 300px; color: white;"></i>
								<el-button type="success" icon="el-icon-lx-warn" style="font-size: 30px;">目前没有匹配结果</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				username: '张三',
				dragOptions: {
					animation: 120,
					scroll: true,
					group: 'sortlist',
					ghostClass: 'ghost-style'
				}

			}
		}

	}
</script>

<style scoped>
	.drag-box {
		display: flex;
		user-select: none;
	}

	.drag-box-item {
		flex: 1;
		max-width: 330px;
		min-width: 300px;
		background-color: #eff1f5;
		margin-right: 16px;
		border-radius: 6px;
		border: 1px #e1e4e8 solid;
	}

	.item-title {
		padding: 8px 8px 8px 12px;
		font-size: 14px;
		line-height: 1.5;
		color: #24292e;
		font-weight: 600;
	}

	.item-ul {
		padding: 0 8px 8px;
		height: 500px;
		overflow-y: scroll;
	}

	.item-ul::-webkit-scrollbar {
		width: 0;
	}

	.drag-list {
		border: 1px #e1e4e8 solid;
		padding: 10px;
		margin: 5px 0 10px;
		list-style: none;
		background-color: #fff;
		border-radius: 6px;
		cursor: pointer;
		-webkit-transition: border .3s ease-in;
		transition: border .3s ease-in;
	}

	.drag-list:hover {
		border: 1px solid #20a0ff;
	}

	.drag-title {
		font-weight: 400;
		line-height: 25px;
		margin: 10px 0;
		font-size: 22px;
		color: #1f2f3d;
	}

	.ghost-style {
		display: block;
		color: transparent;
		border-style: dashed
	}

	.wait-for-search {
		background-color: #409EFF;
		height: 546px;
	}
	
	.wait-for-result {
		background-color: #67C23A;
		height: 546px;
	}
</style>
