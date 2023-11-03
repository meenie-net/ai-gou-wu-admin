import {
  Button,
  ButtonGroup,
  Card,
  FormGroup,
  HotkeysProvider,
  InputGroup,
} from "@blueprintjs/core";
import { Table2, Column, Cell, SelectionModes } from "@blueprintjs/table";
import useTable from "../../hooks/useTable";
import { api } from "../../api";
import { generateArray } from "../../utils";
import UserDrawer from "./UserDrawer";
import emitter, { EmitEventEnum } from "../../utils/EventEmitter";
import Pagination from "./../../components/Pagination/index";
import { useHandleConfirm } from "../../hooks/useHandleConfirm";
import { IUser } from "./user";
import { useButtonPermission } from "../../hooks/useButtonPermission";

const UserList = () => {
  // 使用useTable Hooks获取table数据及相关方法
  const {
    tableData: userData, // 表格数据
    tableRef, // 表格Ref
    updateTable, // 表格更新函数
    loading, // 表格loading状态数组
    pager, // 表格数据分页器数据
    onSelection, // 多选回调函数
    multiSelectedArr, //多选结果数组
  } = useTable<IUser, "id">( // 泛型参数：第一个代表泛型T，第二个参数代表多选数组的值对应的key
    api.getUserList, // 表格数据接口
    {} // 表格配置
  );
  const { BUTTONS } = useButtonPermission();
  const operatorWidth = (() => {
    return Object.keys(BUTTONS).reduce((prev, current) => {
      return prev + current.length * 14 + 43;
    }, 100);
  })();
  // 点击“添加用户”按钮操作
  const handleAdd = () => {
    emitter.emit(EmitEventEnum.OpenUserDrawer, {
      state: "add",
    });
  };
  // 点击“查看”按钮操作
  const handleView = (user: IUser) => {
    emitter.emit(EmitEventEnum.OpenUserDrawer, {
      user,
      state: "edit",
    });
  };
  // 点击“编辑”按钮操作
  const handleEdit = (user: IUser) => {
    emitter.emit(EmitEventEnum.OpenUserDrawer, {
      user,
      state: "edit",
    });
  };
  // 点击“重置密码”按钮操作
  const handleResetPassword = async (user: IUser) => {
    await useHandleConfirm({
      handler: api.deleteUser,
      param: { id: user.id },
      message: `确认重置${user.nick}的密码吗？`,
      intent: "warning",
    });
  };
  // 点击“删除”按钮操作
  const handleDelete = async (user: IUser) => {
    await useHandleConfirm({
      handler: api.deleteUser,
      param: { id: user.id },
      message: `确认删除${user.nick}吗？`,
      icon: "trash",
      intent: "danger",
    });
  };
  // Pagination组件的回调函数
  const paginationChange = (currentPage: number, pageSize: number) => {
    updateTable({ pageNum: currentPage, pageSize });
  };
  // User表格行首渲染函数
  const userRowHeaderRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">{rowIndex + 1}</Cell>
  );
  // User表格操作列渲染函数
  const OperationCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      <ButtonGroup minimal>
        <Button
          onClick={() => handleView(userData[rowIndex])}
          intent="primary"
          icon="eye-open"
        >
          查看
        </Button>
        {BUTTONS.edit && (
          <Button
            onClick={() => handleEdit(userData[rowIndex])}
            intent="primary"
            icon="edit"
          >
            编辑
          </Button>
        )}
        {BUTTONS.edit && (
          <Button
            onClick={() => handleResetPassword(userData[rowIndex])}
            intent="success"
            icon="refresh"
          >
            重置密码
          </Button>
        )}
        {BUTTONS.delete && (
          <Button
            onClick={() => handleDelete(userData[rowIndex])}
            intent="danger"
            icon="delete"
          >
            删除
          </Button>
        )}
      </ButtonGroup>
    </Cell>
  );
  // User表格ID列渲染函数
  const IDCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {userData[rowIndex]?.id}
    </Cell>
  );
  // User表格Nick列渲染函数
  const NickCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {userData[rowIndex]?.nick}
    </Cell>
  );
  // User表格Tel列渲染函数
  const TelCellRenderer = (rowIndex: number) => (
    <Cell className="flex items-center justify-center">
      {userData[rowIndex]?.tel}
    </Cell>
  );
  return (
    // 用户列表container
    <div className="flex h-full flex-col">
      {/* 用户列表操作区 */}
      <Card className="flex justify-between pb-0">
        {/* 用户列表操作区左边 */}
        <div className="flex">
          <FormGroup
            inline
            label={"姓名"}
            labelFor="search-input"
            className="mr-2"
          >
            <InputGroup
              id="search-input"
              placeholder="请输入姓名"
              intent={"none"}
            />
          </FormGroup>
          <FormGroup
            inline
            label={"电话"}
            labelFor="text-input"
            className="mr-2"
          >
            <InputGroup
              id="text-input"
              placeholder="请输入电话"
              intent={"none"}
            />
          </FormGroup>
        </div>
        {/* 用户列表操作区右边 */}
        <div className="flex">
          <FormGroup inline className="mr-2">
            <Button icon="search" text="搜索" />
          </FormGroup>
          <FormGroup inline>
            <Button icon="reset" text="重置" />
          </FormGroup>
        </div>
      </Card>
      {/* 用户列表内容区 */}
      <Card className="mt-3 flex min-h-0 flex-auto flex-col">
        {/* 用户列表内容区头部 */}
        <div className="flex">
          {BUTTONS.delete && (
            <>
              <FormGroup inline className="mr-2">
                <Button onClick={handleAdd} icon="search" text="新增用户" />
              </FormGroup>
              <FormGroup inline className="mr-2">
                <Button
                  icon="search"
                  text="批量删除"
                  disabled={multiSelectedArr.length === 0}
                />
              </FormGroup>
            </>
          )}
        </div>
        {/* 用户列表内容区表格 */}
        <div className="min-h-0 flex-auto">
          <HotkeysProvider>
            <Table2
              ref={tableRef}
              className="overflow-x-hidden"
              numRows={userData.length}
              rowHeights={generateArray(() => 40, userData.length)}
              loadingOptions={loading}
              rowHeaderCellRenderer={userRowHeaderRenderer}
              onSelection={(_) => onSelection(_, "id")} // 多选数组值对应的key
              selectionModes={SelectionModes.ROWS_ONLY}
              columnWidths={[operatorWidth, 50, 100, 100]} // 列宽
              numFrozenColumns={1} // 首列（操作列）冻结
              cellRendererDependencies={[userData]}
            >
              {/* 操作列，置左！！！ */}
              <Column
                id="user-operation"
                name="操作"
                cellRenderer={OperationCellRenderer}
              />
              <Column id="user-id" name="ID" cellRenderer={IDCellRenderer} />
              <Column
                id="user-nick"
                name="昵称"
                cellRenderer={NickCellRenderer}
              />
              <Column
                id="user-tel"
                name="电话"
                cellRenderer={TelCellRenderer}
              />
            </Table2>
          </HotkeysProvider>
        </div>
        {/* 用户列表内容区分页 */}
        <div className="mt-4 flex justify-center">
          <Pagination
            {...pager}
            pagerCount={7} // 分页器页码按钮最大显示数：奇数 || 偶数--
            pageSizeArr={[5, 10, 15, 20, 50, 100, 500]} // 每页条数配置数组
            onChange={paginationChange}
          />
        </div>
      </Card>
      {/* 新增/更新用户侧边弹出 */}
      <UserDrawer />
    </div>
  );
};

export default UserList;
