import React, { useImperativeHandle } from 'react';
import MarkdownIt from 'markdown-it';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { useStores } from '../stores';
import { observer } from 'mobx-react';
import {  message } from 'antd';



const ButtonGloup = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`

const Input = styled.input`
  padding: 5px;
  margin-left: 15px;
  border-radius: 6px;
  outline: none;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover{
    border: 1px solid #1890FF;
    color: #1890FF;
  };

  &:active{
    color: #fff;
    background: #1890ff;
  }
`
const Textarea = styled.textarea`
  display: block;
  resize: none;
  width: 100%;
  border: none;
  font-size: 30px;
  line-height: 1;
  font-weight: 600;
`

const Summary = styled.textarea`
  display: block;
  resize: none;
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
`
const Component = observer(() => {
  const { PostStore } = useStores()
  const handSetTitle = (() => PostStore.setTitle())
  const handSetSlug = (() => PostStore.setSlug())
  const handSetSummary = (() => PostStore.setSummary())
  const handSetContent = (() => PostStore.setContent())

  function Check() {
    if (PostStore.title.length> 30) {
      message.error('标题最多30个字')
    }
    if(/[^A-Za-z\s]/.test(PostStore.slug)){
      message.error('英文标题必须由字母组成')
    }else return true 
  }
  const handSubmit = () => {
    const $ = s => document.querySelector(s)
    const $form = $('form')
    const $msg = $('#msg')
    PostStore.setDom($form)
    if(Check()){
      PostStore.Publish().then((data)=> {
        console.log('fabuchenggong')
        $msg.innerText = data.msg
      })
      .catch((err)=>{
        console.log(err)
        $msg.innerText = '接口异常' 
      })
    }
  }
  return (
    <form onSubmit={handSubmit}>
      <Textarea name="title" value={PostStore.title} onChange={handSetTitle} placeholder="请输入标题(最多30个字)"/>
      <Summary name="slug" value={PostStore.slug} onChange={handSetSlug} placeholder="请输入英文标题" required/>
      <Summary name="summary" value={PostStore.summary} onChange={handSetSummary} placeholder="请输入摘要"/>
      <MDEditor
        id="msg"
        value={PostStore.content}
        onChange={handSetContent}
        height='90vh'
        name="content"
      />
      
      {/* <MDEditor.Markdown source={value} /> */}
      <ButtonGloup className="button">
        <Input type="checkbox" name="is_draft"/>保存成草稿
        <Input type="submit" />
      </ButtonGloup>
    </form>
  );
 
  
})

export default Component;