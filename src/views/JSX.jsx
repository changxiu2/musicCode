import styled from 'styled-components-vue';
const Wrapper = styled.div`
    /* width:100px;
    height:100px;
    background-color:rgb(239,68,68);
    text-align:center;
    .h1{

    }
    .h2{}
    div{
        width: 30px;
        height:30px;
        background-color: #000;
        border-radius: 30px;
        .h3{}
    } */
`;
export default {
    render() {
        return (
            // <div class="w-[100px] h-[100px] bg-red-400 text-center">{this.msg}</div>
            // <Wrapper>
            //     <h1>{this.msg}</h1>
            //     <h2>{this.msg}</h2>
            //     <h3>{this.msg}</h3>
            // </Wrapper>
            <Wrapper>
                <div onClick={() => { this.index++ }}>
                    {index % 2 === 0 ? <div>偶数</div> : <div>奇数</div>}
                </div>
                <img src={this.img} alt="" />
                <input type="text" value={this.value} onInput={e => { this.value = e }} />
            </Wrapper>
        )
    },
    data() {
        return {
            msg: 'hello,jsx!',
            index: 0,
            img: '',
            value: '',
        }
    }
}