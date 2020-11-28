import React from 'React';
import Header from './Header'
import Body from './Body';
import Footer from './Footer'


export default function Layout() {
   
    const [query, setQuery] = React.useState('');
    const [jobs, setJobs] = React.useState([]);
    const [number, setNumber] = React.useState(10);
  
    const params = new URLSearchParams([
      ['_where[_or][2][lister_name_contains]', `${query}`],
      ['_where[_or][3][city_contains]', `${query}`],
      ['_where[_or][4][listing_title_contains]', `${query}`],
      ['_limit', number]
    ]);
  

    async function fetchApi() {
        const result = await axios.get(
        `http://localhost:1337/jobs`,
        { params }
        );
     
        setJobs(result.data);
        }
    
    
    useEffect(() => {
      async function fetchInitialResults() {
      const result = await axios.get(
        `http://localhost:1337/jobs`
      )
      setJobs(result.data);
      }
      fetchInitialResults();
    },[])

return (
    <div>
      <Header />
      <Body query={query} jobs={jobs}/>
      <Footer query={query} setQuery={setQuery} sendQuery={fetchApi}/>
    </div>
)

}

