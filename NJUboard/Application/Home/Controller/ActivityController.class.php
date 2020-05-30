<?php
namespace Home\Controller;

use Think\Controller;
class ActivityController extends BaseController {


    /**
     * 发布活动与招募
     * @return [type] [description]
     */
    public function publish_new_activity(){

        //参数缺失
        if(!$_POST['user_id']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['activity_name']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:activity_name';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['activity_type']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足：activity_type';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['state']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:state';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['starttime']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:starttime';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['endtime']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:endtime';

            $this->ajaxReturn($return_data);
        }

        //日期不合法
        if($_POST['endtime'] < $_POST['starttime']){
            $return_data=array();
            $return_data['error_code']=3;
            $return_data['msg']='日期不合法';

            $this->ajaxReturn($return_data);
        }


        //实例化数据库
        $Activity=M('activity');

        $data=array();
        $data['user_id']=$_POST['user_id'];
        $data['activity_name']=$_POST['activity_name'];
        $data['activity_type']=$_POST['activity_type'];
        $data['state']=$_POST['state'];
        $data['starttime']=$_POST['starttime'];
        $data['endtime']=$_POST['endtime'];
        $data['place']=$_POST['place'];
        $data['reward']=$_POST['reward'];
        $data['phone']=$_POST['phone'];
        $data['picture']=$_POST['picture'];
        $data['audience']=$_POST['audience'];
        $data['other']=$_POST['other'];
        $data['user_name']=$_POST['user_name'];
        $data['user_face']=$_POST['user_face'];

        //插入数据
        $result=$Activity->add($data);

        if($result){
            $return_data=array();
            $return_data['error_code']=0;
            $return_data['msg']='发布成功';

            $return_data['data']['activity_id']=$result;
            $return_data['data']['user_id']=$_POST['user_id'];
            $return_data['data']['activity_name']=$_POST['activity_name'];
            $return_data['data']['activity_type']=$_POST['activity_type'];
            $return_data['data']['state']=$_POST['state'];
            $return_data['data']['starttime']=date('Y-m-d H:i:s', $_POST['starttime']);
            $return_data['data']['endtime']=date('Y-m-d H:i:s', $_POST['endtime']);
            $return_data['data']['place']=$_POST['place'];
            $return_data['data']['reward']=$_POST['reward'];
            $return_data['data']['phone']=$_POST['phone'];
            $return_data['data']['picture']=$_POST['picture'];
            $return_data['data']['audience']=$_POST['audience'];
            $return_data['data']['other']=$_POST['other'];
            $return_data['data']['user_face']=$_POST['user_face'];
            $return_data['data']['user_name']=$_POST['user_name'];


            $this->ajaxReturn($return_data);
        }
        else{
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='发布失败';

            $this->ajaxReturn($return_data);
        }
        
    }



    /**
     * （活动招募页面专用）获得所有活动或招募
     * @return [type] [description]
     */
    public function get_all_activities(){

        if(!$_POST['activity_type']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足: activity_type';

            $this->ajaxReturn($return_data);
        }

        //实例化数据库表
        $Activity=M('activity');

        $where=array();
        $where['activity_type']=$_POST['activity_type'];

        $result=array();

        //实例化查询对象
        $activitis=$Activity->where($where)->order('id desc')->select();

        foreach ($activitis as $key => $value) {
            if($value['state']==3){
                $activitis[$key]['starttime']=date('Y/m/d H:i:s', $value['starttime']);
                $activitis[$key]['endtime']=date('Y/m/d H:i:s', $value['endtime']);
                array_push($result, $activitis[$key]);
            }
        }
        //调整starttime与endtime格式
        foreach ($activitis as $key => $value) {
            if($value['state']!=3&&$value['state']!=4){
                $activitis[$key]['starttime']=date('Y/m/d H:i:s', $value['starttime']);
                $activitis[$key]['endtime']=date('Y/m/d H:i:s', $value['endtime']);
                array_push($result, $activitis[$key]);
            }
        }



        $return_data=array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$activitis;

        $this->ajaxReturn($return_data);

    }


    public function get_offical_recuits(){

        if(!$_POST['activity_type']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足: activity_type';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['official']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足: official';

            $this->ajaxReturn($return_data);
        }

        //实例化数据库表
        $Activity=M('activity');

        $where=array();
        $where['activity_type']=$_POST['activity_type'];
        $where['official']=$_POST['official'];

        $result=array();

        //实例化查询对象
        $activitis=$Activity->where($where)->order('id desc')->select();

        foreach ($activitis as $key => $value) {
            if($value['state']==3){
                $activitis[$key]['starttime']=date('Y-m-d H:i:s', $value['starttime']);
                $activitis[$key]['endtime']=date('Y-m-d H:i:s', $value['endtime']);
                array_push($result, $activitis[$key]);
            }
        }
        //调整starttime与endtime格式
        foreach ($activitis as $key => $value) {
            if($value['state']!=3&&$value['state']!=4){
                $activitis[$key]['starttime']=date('Y-m-d H:i:s', $value['starttime']);
                $activitis[$key]['endtime']=date('Y-m-d H:i:s', $value['endtime']);
                array_push($result, $activitis[$key]);
            }
        }



        $return_data=array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$result;

        $this->ajaxReturn($return_data);

    }


	/**
     * 查找指定活动与招募
     * @return [type] [description]
     */
    public function find_activity(){
    	if(!$_POST['activity_id']){
    		$return_data=array();
        	$return_data['error_code']=1;
        	$return_data['msg']='参数不足:activity_id';

        	$this->ajaxReturn($return_data);
    	}

    	$Activity=M('activity');
    	$where=array();
    	$where['id']=$_POST['activity_id'];

    	$activity=$Activity->where($where)->find();

    	if($activity){
        	$return_data=array();
        	$return_data['error_code']=0;
        	$return_data['msg']='数据获取成功';
        	$return_data['data']['activity_id']=$activity['id'];
        	$return_data['data']['user_id']=$activity['user_id'];
        	$return_data['data']['user_name']=$activity['user_name'];
        	$return_data['data']['user_face']=$activity['user_face'];
        	$return_data['data']['activity_name']=$activity['activity_name'];
        	$return_data['data']['activity_type']=$activity['activity_type'];
        	$return_data['data']['state']=$activity['state'];
        	$return_data['data']['starttime']=date('Y-m-d H:i:s', $activity['starttime']);
        	$return_data['data']['endtime']=date('Y-m-d H:i:s', $activity['endtime']);
        	$return_data['data']['place']=$activity['place'];
        	$return_data['data']['reward']=$activity['reward'];
        	$return_data['data']['phone']=$activity['phone'];
        	$return_data['data']['picture']=$activity['picture'];
        	$return_data['data']['audience']=$activity['audience'];
        	$return_data['data']['other']=$activity['other'];

        	$this->ajaxReturn($return_data);
    	}
    	else{
    		$return_data=array();
        	$return_data['error_code']=2;
        	$return_data['msg']='没有该活动';

        	$this->ajaxReturn($return_data);
    	}

	}


    /**
     * 修改指定活动与招募
     * @return [type] [description]
     */
    public function update_activity(){
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

        if(!$_POST['activity_name']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:activity_name';

            $this->ajaxReturn($return_data);
        }

        if(!$_POST['activity_type']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:activity_type';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['state']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:state';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['starttime']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:starttime';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['endtime']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:endtime';

            $this->ajaxReturn($return_data);
        }
        $Activity=M('activity');
        $where=array();
        $where['id']=$_POST['activity_id'];

        $activity=$Activity->where($where)->find();

        if($activity){
            $data=array();
            $data['user_id']=$_POST['user_id'];
            $data['user_name']=$_POST['user_name'];
            $data['user_face']=$_POST['user_face'];
            $data['activity_name']=$_POST['activity_name'];
            $data['activity_type']=$_POST['activity_type'];
            $data['state']=$_POST['state'];
            $data['starttime']=$_POST['starttime'];
            $data['endtime']=$_POST['endtime'];
            $data['place']=$_POST['place'];
            $data['reward']=$_POST['reward'];
            $data['phone']=$_POST['phone'];
            $data['picture']=$_POST['picture'];
            $data['audience']=$_POST['audience'];
            $data['other']=$_POST['other'];

            $result=$Activity->where($where)->save($data);
            if($result){

                $Record=M('record');

                if($_POST['state']==1||$_POST['state']==2||$_POST['state']==4){
                    $temp=array();
                    $temp['state']=$_POST['state'];
                    $where=array();
                    $where['activity_id']=$_POST['activity_id'];
                    $records=$Record->where($where)->select();
                    foreach ($records as $key => $record) {
                        if($record['state']!=3){
                            $where=array();
                            $where['id']=$record['id'];
                            $Record->where($where)->save($temp);
                        }
                    }
                    
                    $return_data=array();
                    $return_data['error_code']=0;
                    $return_data['msg']='修改活动成功';

                    $this->ajaxReturn($return_data);
                    
                  
                }

               if($_POST['state']==3){
                    $temp=array();
                    $temp['state']=1;
                    $where=array();
                    $where['activity_id']=$_POST['activity_id'];
                    $records=$Record->where($where)->select();
                    foreach ($records as $key => $record) {
                        if($record['state']!=3){
                            $where=array();
                            $where['id']=$record['id'];
                            $Record->where($where)->save($temp);
                        }
                    }
                    
                    $return_data=array();
                    $return_data['error_code']=0;
                    $return_data['msg']='修改活动成功';

                    $this->ajaxReturn($return_data);
                    
                  
                }
            }

            else{
                $return_data=array();
                $return_data['error_code']=3;
                $return_data['msg']='未修改';

                $this->ajaxReturn($return_data);
            }
        }

        else{
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='没有此活动';
                
            $this->ajaxReturn($return_data);
        }

    }


    /**
     * 获取指定用户发布的活动
     * @return [type] [description]
     */
    public function get_user_activities(){

        //参数缺失
        if(!$_POST['user_id']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }
        //实例化数据库表
        $Activity=M('activity');

        //设置查询条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['activity_type']=1;
        //实例化查询对象
        $activitis=$Activity->where($where)->order('id desc')->select();
        //调整starttime与endtime格式
        foreach ($activitis as $key => $value) {

            $activitis[$key]['starttime']=date('Y-m-d H:i:s', $value['starttime']);
            $activitis[$key]['endtime']=date('Y-m-d H:i:s', $value['endtime']);
        }

        $return_data=array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$activitis;

        $this->ajaxReturn($return_data);
    }


    /**
     * 获取指定用户发布的招募
     * @return [type] [description]
     */
    public function get_user_recruits(){

        //参数缺失
        if(!$_POST['user_id']){

            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }
        //实例化数据库表
        $Activity=M('activity');

        //设置查询条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['activity_type']=2;
        //实例化查询对象
        $activitis=$Activity->where($where)->order('id desc')->select();
        //调整starttime与endtime格式
        foreach ($activitis as $key => $value) {

            $activitis[$key]['starttime']=date('Y-m-d H:i:s', $value['starttime']);
            $activitis[$key]['endtime']=date('Y-m-d H:i:s', $value['endtime']);
        }

        $return_data=array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$activitis;

        $this->ajaxReturn($return_data);
    }


}