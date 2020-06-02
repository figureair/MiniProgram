<?php
namespace Home\Controller;

use Think\Controller;
class RecordController extends BaseController {

	/**
     * 退出指定活动与招募
     * @return [type] [description]
     */
    public function exit_activity(){
        if(!$_POST['record_id']){
        	
        	$return_data=array();
        	$return_data['error_code']=1;
        	$return_data['msg']='参数不足:record_id';

        	$this->ajaxReturn($return_data);
        }

        //查询活动记录
        $Record=M('record');
        $where=array();
        $where['id']=$_POST['record_id'];

        $record=$Record->where($where)->find();

        if($record){
            $data=array();
            $data['state']=3;
        	$result=$Record->where($where)->save($data);
            if($result){
                $result=$Record->where($where)->find();
        	    $return_data=array();
        	    $return_data['error_code']=0;
        	    $return_data['msg']='退出成功';
        	    $return_data['data']['record_id']=$result['id'];
        	    $return_data['data']['user_id']=$result['user_id'];
        	    $return_data['data']['activity_id']=$result['activity_id'];
        	    $return_data['data']['state']=$result['state'];
                $return_data['data']['chosen']=$result['chosen'];

        	    $this->ajaxReturn($return_data);
            }
            else{
                $return_data=array();
                $return_data['error_code']=3;
                $return_data['msg']='退出失败，已退出此活动';

                $this->ajaxReturn($return_data);
            }
        }
        else{
        	$return_data=array();
        	$return_data['error_code']=2;
        	$return_data['msg']='未找到该活动记录';

        	$this->ajaxReturn($return_data);
        }
	}


    /**
     * 查找指定活动与招募的报名情况
     * @return [type] [description]
     */
    public function activity_signup(){
        if(!$_POST['activity_id']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:activity_id';

            $this->ajaxReturn($return_data);
        }

        $Record=M('record');
        $where=array();
        $where['activity_id']=$_POST['activity_id'];
        $result=array();
        $all_record=$Record->where($where)->select();

            $User=M('user');
            foreach ($all_record as $key => $record) {
                if($record['state']!=3){
                    $where=array();
                    $where['id']=$record['user_id'];
                    $user=$User->where($where)->find();
                    $all_record[$key]['user_name']=$user['user_name'];
                    $all_record[$key]['phone']=$user['phone'];
                    $all_record[$key]['mailbox']=$user['mailbox'];
                    array_push($result, $all_record[$key]);
                }
            }
            $return_data=array();
            $return_data['error_code']=0;
            $return_data['msg']='查询成功';
            $return_data['all_record']=$result;
            $this->ajaxReturn($return_data);
  

    }

     /**
     * 参加指定活动与招募
     * @return [type] [description]
     */
    public function user_signup(){
        if(!$_POST['activity_id']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:activity_id';

            $this->ajaxReturn($return_data);
        }

        if(!$_POST['user_id']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }

        if(!$_POST['state']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:state';

            $this->ajaxReturn($return_data);
        }

        $Record=M('record');
        $Activity=M('activity');
        $data=array();
        $data['id']=$_POST['activity_id'];
        $result=$Activity->where($data)->find();
        if(!$result||$result['state']==4){
            $return_data=array();
            $return_data['error_code']=3;
            $return_data['msg']='暂无此活动';

             $this->ajaxReturn($return_data);
        }
        $data=array();
        $data['activity_id']=$_POST['activity_id'];

        $data['user_id']=$_POST['user_id'];

        $result=$Record->where($data)->find();

        if($result){
            if($result['state']==1||$result['state']==2){
                $return_data=array();
                $return_data['error_code']=4;
                $return_data['msg']='已参加';

                $this->ajaxReturn($return_data);
            }
            elseif($result['state']==3){
                $update=array();
                $update['state']=1;
                $result2=$Record->where($data)->save($update);
                if($result2){
                    $return_data=array();
                    $return_data['error_code']=0;
                    $return_data['msg']='参加成功';
                    $this->ajaxReturn($return_data);
                }
                else{
                    $return_data=array();
                    $return_data['error_code']=2;
                    $return_data['msg']='参加失败';
                    $this->ajaxReturn($return_data);
                }
            }

            elseif($result['state']==4){
                 $return_data=array();
                    $return_data['error_code']=3;
                    $return_data['msg']='暂无此活动';
                    $this->ajaxReturn($return_data);
            }
        }
        $data['state']=$_POST['state'];

        $result=$Record->add($data);
        if($result){
            $return_data=array();
            $return_data['error_code']=0;
            $return_data['msg']='参加成功';
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='参加失败';

            $this->ajaxReturn($return_data);
        }
    }


    /**
     * 获取指定用户参加的活动与招募
     * @return [type] [description]
     */
    public function get_user_participates(){

        //参数缺失
        if(!$_POST['user_id']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }
        //实例化数据库表
        $Record=M('record');
        $Activity=M('activity');
        //设置查询条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        //实例化查询对象
        $records=$Record->where($where)->order('activity_id desc')->select();//->toArray()

        foreach ($records as $key => $record) {
            $where=array();
            $where['id']=$record['activity_id'];
            $activity=$Activity->where($where)->find();
            $records[$key]['user_id']=$activity['user_id'];
            $records[$key]['activity_name']=$activity['activity_name'];
            $records[$key]['activity_type']=$activity['activity_type'];
            $records[$key]['activity_state']=$activity['state'];
            $records[$key]['starttime']=date('Y-m-d H:i:s', $activity['starttime']);
            $records[$key]['endtime']=date('Y-m-d H:i:s', $activity['endtime']);
            $records[$key]['place']=$activity['place'];
            $records[$key]['reward']=$activity['reward'];
            $records[$key]['phone']=$activity['phone'];
            $records[$key]['picture']=$activity['picture'];
            $records[$key]['audience']=$activity['audience'];
            $records[$key]['other']=$activity['other'];
            $records[$key]['user_face']=$activity['user_face'];
            $records[$key]['user_name']=$activity['user_name'];
        }

        $return_data=array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$records;

        $this->ajaxReturn($return_data);
    }

     /**
     * 选中状态更改接口
     * @return [type] [description]
     */
    public function choose(){
        if(!$_POST['record_id']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:record_id';

            $this->ajaxReturn($return_data);
        }

        $Record=M('Record');
        $where=array();
        $where['id']=$_POST['record_id'];
        $record=$Record->where($where)->find();

        if($record){
            if($record['chosen']==1){
                $data=array();
                $data['chosen']=2;
                $result=$Record->where($where)->save($data);
            }
            else{
                $data=array();
                $data['chosen']=1;
                $result=$Record->where($where)->save($data);
            }
            $return_data=array();
            $return_data['error_code']=0;
            $return_data['msg']='选中状态更改';

            $this->ajaxReturn($return_data);
        }
        else{
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='未有该活动记录';

            $this->ajaxReturn($return_data);
        }
    }
}
