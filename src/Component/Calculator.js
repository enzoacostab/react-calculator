import React from 'react';

class Calculator extends React.Component{
    constructor(props){
      super(props);
      this.state={
      input:['0'],
      res:'',
      op:false,
      dec:false,
      eq:false,
      theme:'light'
      };
    };
    handleClick=(e)=>{
      if (this.state.eq===true){
        this.setState((state)=>{
          return {res:state.input,
          input:['0'],
          eq:false};
        });
      };
      this.setState((state)=>{
        if ((state.input.length===1) && (state.input[0]==='0')){
          if (e.target.value==='0'){
            return;
          }
          else{
            const ar=state.input.splice(0,0).concat(e.target.value);
            return {input:ar, op:false};
          };
        }
        else if (state.input.length<22){
          const ar=state.input.concat(e.target.value);
          return {input:ar, op:false};
        };
      });
    };
    opClick=(e)=>{
      this.setState((state)=>{
        if ((state.op===false && state.input.length<22) || (state.op===true && e.target.value==="-" && state.input[(state.input.length)-1]!=="-")){
          const ar=state.input.concat(e.target.value);
          return {input:ar, op:true, dec:false,eq:false};
        }
        else{
          let i=(state.input.length)-1;
          while (isNaN(state.input[i])===true){
            state.input.pop();
            i--;
            };
          const ar=state.input.concat(e.target.value);
          return {input:ar, op:true, dec:false,eq:false};
        };
      });
    };    
    decClick=(e)=>{
      if (this.state.eq===true){
        this.setState((state)=>{
          return {res:state.input, input:['0'], eq:false};
        });
      }
      if (this.state.dec===false && this.state.input.length<22){
        this.setState((state)=>{
          let arr=[];
          if (isNaN(state.input[(state.input.length)-1])){
            arr=state.input.concat('0',e.target.value);
          }
          else{
            arr=state.input.concat(e.target.value);
          };
          return {input:arr, dec:true};
        });
      };
    };
    equalClick=()=>{
      this.setState((state)=>{
        if (isNaN(state.input[(state.input.length)-1])){
          state.input.pop();
        };
        let r=eval(state.input.join(''));
        return {res:state.input, input:[r], op:false, dec:false, eq:true};
      });
    };
    delClick=()=>{
      this.state.input.pop();
      this.setState({input:this.state.input});
    };
    clearClick=()=>{
      this.setState({input:['0'], res:'', op:false, dec:false, eq:false});
    };
    Theme=()=>{
      let c=document.getElementsByClassName("t");
      let b=document.querySelector('.b');
      this.setState((state)=>{
        if (state.theme==='light'){
          for (let i=0;i<c.length;i++){
            c[i].classList.add('dark');
          };
          b.classList.remove("fa-toggle-off");
          b.classList.add("fa-toggle-on");
          return {theme:'dark'};
        }
        else{
          for (let i=0;i<c.length;i++){
            c[i].classList.remove('dark');
          };
          b.classList.add("fa-toggle-off");
          b.classList.remove("fa-toggle-on");
          return {theme:'light'};
        };
      }); 
    };
    render(){
      return(
        <div className='Calculator'>
        <div className='row'>
        <div className='col-sm-12 d2 t'><label id='display2'>{this.state.res}</label></div>
        <div className='col-sm-12' id='line'><label id='display'>{this.state.input}</label></div>
        </div>
        <div className='row'>
        <div className='col-sm-3'><button className='btn1 c' id='clear' onClick={this.clearClick}><i class='fa-solid fa-c'></i></button></div>
        <div className='col-sm-3'><button className='btn1 c' onClick={this.delClick}><i class='fa-solid fa-delete-left'></i></button></div>
        <div className='col-sm-3'><button className='btn1 c' value={'%'} onClick={this.opClick}><i class='fa-solid fa-percent'></i></button></div>
        <div className='col-sm-3'><button className='btn1 c' value={'/'} id='divide' onClick={this.opClick}><i className='fa-solid fa-divide'></i></button></div>
        </div>
        <div className='row'>
        <div className='col-sm-3'><button className='btn1 t' id='seven' value={7} onClick={this.handleClick}>7</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='eight' value={8} onClick={this.handleClick}>8</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='nine' value={9} onClick={this.handleClick}>9</button></div>
        <div className='col-sm-3'><button className='btn1 c' value={'+'} id='add' onClick={this.opClick}><i className='fa-solid fa-plus'></i></button></div>
        </div>
        <div className='row'>
        <div className='col-sm-3'><button className='btn1 t' id='four' value={4} onClick={this.handleClick}>4</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='five' value={5} onClick={this.handleClick}>5</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='six' value={6} onClick={this.handleClick}>6</button></div>
        <div className='col-sm-3'><button className='btn1 c' value={'-'} id='subtract' onClick={this.opClick}><i className='fa-solid fa-minus'></i></button></div>
        </div>
        <div className='row'>
        <div className='col-sm-3'><button className='btn1 t' id='one' value={1} onClick={this.handleClick}>1</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='two' value={2} onClick={this.handleClick}>2</button></div>
        <div className='col-sm-3'><button className='btn1 t' id='three' value={3} onClick={this.handleClick}>3</button></div>
        <div className='col-sm-3'><button className='btn1 c' value={'*'} id='multiply' onClick={this.opClick}><i class='fa-solid fa-xmark'></i></button></div>
        </div>
        <div className='row'>
        <div className='col-sm-3'><button className='btn1 t' onClick={this.Theme}><i className='fa-solid fa-toggle-off b'></i></button></div>
        <div className='col-sm-3'><button className='btn1 t' id='zero' value={0} onClick={this.handleClick}>0</button></div>
        <div className='col-sm-3'><button className='btn1 t' value={'.'} id='decimal' onClick={this.decClick}>.</button></div>
        <div className='col-sm-3'><button className='btn1' value={'='} id='equals' onClick={this.equalClick}>=</button></div>
        </div>
        </div>);
    };
  };

  
  export default Calculator;
  