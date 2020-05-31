<?php
namespace Home\Controller;

use Think\Controller;
class UserController extends BaseController {

    /**
    * 注册
    * @return [type] [description]
    */
    public function signup(){
        if(!$_POST['phone']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:phone';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['password']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:password';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['user_sno']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_sno';

            $this->ajaxReturn($return_data);
        }

        $User=M('user');

        $where_phone=array();
        $where_phone['phone'] = $_POST['phone'];
        $where_sno=array();
        $where_sno['user_sno']=$_POST['user_sno'];

        $judge_phone=$User->where($where_phone)->find();
        $judge_sno=$User->where($where_sno)->find();

        if($judge_phone){
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='该手机号已被注册过';

            $this->ajaxReturn($return_data);
        }

        if($judge_sno){
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='该学号已被注册过';

            $this->ajaxReturn($return_data);
        }


        
            //构建
            $data=array();
            $data['user_sno']=$_POST['user_sno'];
            $data['phone']=$_POST['phone'];
            $data['password']=md5($_POST['password']);

            //插入
            $result=$User->add($data);

            if($result){
                //插入数据执行成功
                $return_data=array();
                $return_data['error_code']=0;
                $return_data['msg']='注册成功';
                $result=$User->where($where_phone)->find();
                $return_data['data']['user_id']=$result['id'];
                $return_data['data']['user_name']=$result['user_name'];
                $return_data['data']['phone']=$result['phone'];
                $return_data['data']['password']=$_POST['password'];
                $return_data['data']['user_sno']=$result['user_sno'];
                $return_data['data']['description']=$result['description'];
                $return_data['data']['face_url']=$result['face_url'];
                $return_data['data']['mailbox']=$result['mailbox'];
                $return_data['data']['official']=$result['official'];

                $this->ajaxReturn($return_data);
            }
            else{
                //插入数据执行失败
                $return_data=array();
                $return_data['error_code']=3;
                $return_data['msg']='注册失败';

                $this->ajaxReturn($return_data);
            }
    }

    /**
    * 登录
    * @return [type] [description]
    */
    public function login(){
        if(!$_POST['user_sno']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_sno';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['password']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:password';
            $this->ajaxReturn($return_data);
        }

        $User=M('user');

        $where=array();
        $where['user_sno']=$_POST['user_sno'];

        $user=$User->where($where)->find();
        if($user){

            if(md5($_POST['password']) != $user['password']){
                $return_data=array();
                $return_data['error_code']=2;
                $return_data['msg']='用户名与密码不匹配，请重新输入';

                $this->ajaxReturn($return_data);
            }
            else{
                $return_data=array();
                $return_data['error_code']=0;
                $return_data['msg']='登陆成功';

                $return_data['data']['user_id']=$user['id'];
                $return_data['data']['user_name']=$user['user_name'];
                $return_data['data']['phone']=$user['phone'];
                $return_data['data']['password']=$_POST['password'];
                $return_data['data']['user_sno']=$user['user_sno'];
                $return_data['data']['description']=$user['description'];
                $return_data['data']['face_url']=$user['face_url'];
                $return_data['data']['mailbox']=$user['mailbox'];
                $return_data['data']['official']=$user['official'];
                

                $this->ajaxReturn($return_data);
            }
        }
        else{
            $return_data=array();
            $return_data['error_code']=3;
            $return_data['msg']='找不到该用户';

            $this->ajaxReturn($return_data);
        }
    }

    /**
     * 修改个人信息
     * @return [type] [description]
     */
	public function update_user(){
        if(!$_POST['user_id']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_id';

            $this->ajaxReturn($return_data);
        }

        if(!$_POST['phone']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:phone';

            $this->ajaxReturn($return_data);
        }

        if(!$_POST['password']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:password';

            $this->ajaxReturn($return_data);
        }
        if(!$_POST['user_sno']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足:user_sno';

            $this->ajaxReturn($return_data);
        }
       
        $User=M('user');
        $where=array();
        $where['id']=$_POST['user_id'];

        $where_phone=array();
        $where_phone['phone']=$_POST['phone'];

        $where_sno=array();
        $where_sno['user_sno']=$_POST['user_sno'];
        $user=$User->where($where)->find();
        $judge_phone=$User->where($where_phone)->find();
        $judge_sno=$User->where($where_sno)->find();

        if(($judge_phone)&&($judge_phone['id']!=$user['id'])){
        	$return_data=array();
            $return_data['error_code']=4;
            $return_data['msg']='手机号已存在';

            $this->ajaxReturn($return_data);
        }

        if(($judge_sno)&&($judge_sno['id']!=$user['id'])){
        	$return_data=array();
            $return_data['error_code']=4;
            $return_data['msg']='学号已存在';

            $this->ajaxReturn($return_data);
        }
        if($user){
            $data=array();
            $data['user_name']=$_POST['user_name'];
            $data['phone']=$_POST['phone'];
            $data['password']=md5($_POST['password']);
            $data['user_sno']=$_POST['user_sno'];
            $data['description']=$_POST['description'];
            $data['face_url']=$_POST['face_url'];
            $data['mailbox']=$_POST['mailbox'];
       
            $result=$User->where($where)->save($data);
            if($result){
                $result=$User->where($where)->find();
                $return_data=array();
                $return_data['error_code']=0;
                $return_data['msg']='修改个人信息成功';

                $return_data['data']['user_id']=$result['id'];
                $return_data['data']['user_name']=$result['user_name'];
                $return_data['data']['phone']=$result['phone'];
                $return_data['data']['password']=$_POST['password'];
                $return_data['data']['user_sno']=$result['user_sno'];
                $return_data['data']['description']=$result['description'];
                $return_data['data']['face_url']=$result['face_url'];
                $return_data['data']['mailbox']=$result['mailbox'];
                $return_data['data']['official']=$result['official'];

                $this->ajaxReturn($return_data);
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
            $return_data['msg']='没有此用户';
                
            $this->ajaxReturn($return_data);
        }
    }

}