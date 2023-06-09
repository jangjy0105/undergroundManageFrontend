import axios from "axios";
import { useEffect, useState } from "react";
import List from "../../components/recyclingComponents/list";
import SearchFilter from "../../components/recyclingComponents/searchFilter";

function CopyMovieManage () {

  const [dataLength, setDataLength] = useState();
  const [queryData, setQueryData] = useState();
  const elements = {title: '제목', directors: '감독', scenarios: '각본', actors: '출연진', summary: '줄거리', rating: '관람등급', genres: '장르', tags: ['태그', 'tagName'], date: '등록일'}

  const listBtns = [
    {name: '삭제', api: '/movie/delete'},
    {name: '공개', api: '/movie/open'},
    {name: '미공개', api: '/movie/close'}
  ];

  const [tags, setTags] = useState();
  const [tagSelectMenus, setTagsSelectMenus] = useState([]);
  
  const [searchInputs, setSearchInputs] = useState({
    title: {name: '제목', isPlural: true, isInput: true, type: 'default', addDataName: 'title', inputValue: ''},
    director: {name: '감독', isPlural: true, isInput: true, type: 'default', addDataName: 'directors', inputValue: ''},
    scenario: {name: '각본', isPlural: true, isInput: true, type: 'default', addDataName: 'scenarios', inputValue: ''},
    actor: {name: '출연진', isPlural: true, isInput: true, type: 'default', addDataName: 'actors', inputValue: ''},
    registrant: {name: '등록인', isPlural: true, isInput: true, type: 'default', addDataName: 'registrants', inputValue: ''},
    genre: {name: '장르', isPlural: true, isInput: false, type: 'select', addDataName: 'genres', inputValue: '', selectMenus: ['공포', '판타지', '액션', '멜로', '스릴러']},
    tag: {name: '태그', isPlural: true, isInput: false, type: 'select', addDataName: 'tags', inputValue: '', selectMenus: []},
    date: {name: '신청일', isPlural: false, isInput: false, type:'date', addDataName: 'date', inputValue: ''}
  })

  const [addedSearchDatas, setAddedSearchDatas] = useState({
    title:[],
    directors:[],
    scenarios:[],
    actors:[],
    registrants:[],
    genres:[],
    tags:[],
    date:['', '']
  })

  const [searchOption, setSearchOption] = useState('and');
  

  useEffect(() => {
    axios.get('/api/tag/getTag')
    .then((res) => {
      setTags(res.data);
      var tagNames = [];
      res.data.map((tag) => {
        tagNames.push(tag.tagName);
      })
      setSearchInputs({...searchInputs, tag: {...searchInputs.tag, selectMenus: tagNames}})
    })
  },[])

  // useEffect(() => {
  //   axios.post('/api/movie/getLength', {queryData: queryData}, {"Content-Type": 'application/json'})
  //   .then((response) => {
  //     setDataLength(response.data);
  //   })
  // },[queryData])

  return (
    <div className="manage">
      <h2>영화 관리 페이지(테스트)</h2>
      {/* <MovieSearchFilter setQueryData={setQueryData} /> */}
      <SearchFilter inputs={searchInputs} setInputs={setSearchInputs} addedDatas={addedSearchDatas} setAddedDatas={setAddedSearchDatas} queryData={queryData} setQueryData={setQueryData} searchOption={searchOption} setSearchOption={setSearchOption} setDataLength={setDataLength} getLengthApi={'movie/getLength'} />
      <List dataLength={dataLength} queryData={queryData} searchOption={searchOption} elements={elements} defaultShow={['title', 'directors', 'scenarios', 'tags']} listName='영화' getListApi={'copyMovie/getMovieList'} listBtns={listBtns} />
    </div>
  )
}

export default CopyMovieManage;