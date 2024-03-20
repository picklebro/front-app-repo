import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../Services/api';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CountryCard from '../Components/CountryCard';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Home.css';
import logo from './logo.png';
import Button from '@mui/material/Button';
// import {
//     CognitoUserPool,
//   } from 'amazon-cognito-identity-js';
//   import { COGNITO_API } from '../config';


// 추가된 항목
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function Home({ isDarkMode, setIsDarkMode }) {
    const [allCountriesList, setCountriesList] = useState([]);
    const [filteredCountriesList, setFilteredCountriesList] = useState([]);
    const [region, setRegion] = useState('');
    const [countryName, setCountryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // 추가된 항목 
    const [codeValue, setCodeValue] = useState('');
    // const history = useHistory();
    // const navigate = useNavigate();
    const location = useLocation();
    //  변수 추가 

    // const userPool = new CognitoUserPool({
    //     UserPoolId: COGNITO_API.userPoolId || '',
    //     ClientId: COGNITO_API.clientId || '',
    //   });


    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // const AWS = require('aws-sdk');
    // const CognitoSDK = require('amazon-cognito-identity-js');

    // const poolData = {
    //     UserPoolId: 'ap-northeast-2_VxsI16VF2',
    //     ClientId: '39rqqcgnbsobg79516fghj80t8'
    // };


    // const login = () => {
    //     const clientId = poolData.ClientId
    //     const responseType = 'code';
    //     const redirectUri = 'https://www.mwoya.wtf';
    //     const loginUrl = `https://camelodian.auth.ap-northeast-2.amazoncognito.com/oauth2/token/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;
    //     window.location.assign(loginUrl);
    //   };

    //   const handleCallback = async () => {
    //     const code = new URLSearchParams(window.location.search).get("code");

    //     if (code) {
    //       const result = await fetch(`https://camelodian.auth.ap-northeast-2.amazoncognito.com/oauth2/token`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: new URLSearchParams({
    //           grant_type: 'authorization_code',
    //           client_id: poolData.ClientId,
    //           redirect_uri: poolData.RedirectionUri,
    //           code: code
    //         })
    //       });
    //       const data = await result.json();
    //       // Access Token, ID Token 사용
    //     }
    //   };


    // 새로운 event
    const handleButtonClick = () => {
        if (codeValue) { // codeValue가 존재하면
            // 로그아웃 URL로 이동
            window.location.href = 'https://camelodian.auth.ap-northeast-2.amazoncognito.com/logout?client_id=39rqqcgnbsobg79516fghj80t8&logout_uri=https://www.mwoya.wtf/';
        } else {
            // 로그인 URL로 이동
            window.location.href = 'https://camelodian.auth.ap-northeast-2.amazoncognito.com/login?client_id=39rqqcgnbsobg79516fghj80t8&redirect_uri=https://www.mwoya.wtf/&response_type=code';
        }
    };
    // 여기 까지

    // 인증 코드를 이용해 토큰을 받아오는 함수입니다.
    // const handleCallback = async () => {
    //     const code = new URLSearchParams(window.location.search).get('code');
    //     if (code) {
    //         console.log(code);
    //         try {
    //             const result = await fetch(
    //                 `https://camelodian.auth.ap-northeast-2.amazoncognito.com/oauth2/token`,
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/x-www-form-urlencoded',
    //                     },
    //                     body: new URLSearchParams({
    //                         grant_type: 'authorization_code',
    //                         // client_id와 redirect_uri를 아래처럼 직접 명시하거나,
    //                         // 변수에서 값을 가져오도록 설정해야 합니다.
    //                         client_id: '39rqqcgnbsobg79516fghj80t8',
    //                         redirect_uri: 'https://www.mwoya.wtf',
    //                         code: code,
    //                     }),
    //                 }
    //             );

    //             const data = await result.json();

    //             // 토큰을 세션 스토리지에 저장합니다.
    //             if (data.access_token) {
    //                 sessionStorage.setItem('access_token', data.access_token);
    //                 // 필요에 따라 ID 토큰과 리프레시 토큰도 저장할 수 있습니다.
    //                 sessionStorage.setItem('id_token', data.id_token);
    //                 // 다른 로직 수행 (예: 유저 인터페이스 업데이트, 페이지 리디렉션 등)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching and parsing data', error);
    //             // 에러 처리 로직 (예: 사용자에게 에러 메시지 보이기)
    //         }
    //     }
    // };

    // useEffect(() => {
    //     handleCallback();
    //     // esline-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect 추가
    useEffect(() => {
        // 컴포넌트가 마운트되면 URL에서 "code" 매개변수 추출
        const codeFromURL = new URLSearchParams(location.search).get('code');
        setCodeValue(codeFromURL || '');
        console.log(codeValue)
        sessionStorage.setItem('code', codeValue);
    }, [location.search,codeValue]);
    // 여기 까지

    useEffect(() => {
        getAllCountries().then((result) => {
            console.log(result);
            const countries = result.data;
            setCountriesList(countries);
            setFilteredCountriesList(countries);
            setIsLoading(false)
        });
    }, []);

    useEffect(() => {
        console.log('Region or country name changed: ', region, countryName);
        if (region === '' && countryName === '') {
            setFilteredCountriesList(allCountriesList);
        } else {
            let filteredCountries = allCountriesList;
            if (region.length) {
                filteredCountries = filteredCountries.filter((country) => {
                    if (country.region === region) return true;
                    return false;
                });
            }
            if (countryName.length) {
                filteredCountries = filteredCountries.filter((country) => {
                    const lowercaseName = country.name.toLowerCase();
                    if (lowercaseName.includes(countryName.toLowerCase())) return true;
                    return false;
                });
            }
            setFilteredCountriesList(filteredCountries);
        }
    }, [region, allCountriesList, countryName]);
    console.log(allCountriesList)
    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {isLoading ? (
                // Display the loader while data is loading
                <div className="loader">Loading...</div>
            ) : (
                <>
                    <div className={`navbar-container ${isDarkMode ? 'dark-nav' : 'light-nav'}`}>
                        <div className="navbar">
                            <div className="logo">
                                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                            </div>
                            <div className={`search ${isDarkMode ? 'dark-srch' : 'light-srch'}`}>
                                <div className="search-only">
                                    <TextField
                                        id="outlined-basic"
                                        label="Search Name"
                                        className='search-by-name'
                                        variant="outlined"
                                        onChange={handleCountryNameChange}
                                        value={countryName}
                                        InputLabelProps={{
                                            style: { color: isDarkMode ? 'white' : '' }
                                        }}
                                        InputProps={{
                                            style: {
                                                color: isDarkMode ? 'white' : '',
                                                border: isDarkMode ? '1px solid white' : '',
                                            }
                                        }}
                                    />
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label" sx={{ color: isDarkMode ? 'white' : '' }} >Filter by Region</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={region}
                                            label="Filter by Region"
                                            onChange={handleRegionChange}

                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            <MenuItem value={'Africa'}>Africa</MenuItem>
                                            <MenuItem value={'Americas'}>Americas</MenuItem>
                                            <MenuItem value={'Asia'}>Asia</MenuItem>
                                            <MenuItem value={'Europe'}>Europe</MenuItem>
                                            <MenuItem value={'Oceania'}>Oceania</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='dark-controller'>
                                    <div style={{ fontSize: "12px" }}>{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
                                    <FormControlLabel
                                        control={<Switch color="primary" checked={isDarkMode} onChange={toggleDarkMode} sx={{ marginLeft: "20%" }} />}

                                    />
                                    <Link>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ marginLeft: "20px" }}
                                            onClick={handleButtonClick} // handleButtonClick 실행
                                        >
                                            {codeValue ? 'CI/CD Test' : 'CI/CD Test'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="country-card-wrapper">
                        {filteredCountriesList.map((country) => (
                            <Link
                                to={`/${country.alpha3Code}`}
                                key={country.alpha3Code}
                                style={{ textDecoration: 'none' }}
                            >
                                <CountryCard
                                    name={country.name}
                                    capital={country.capital}
                                    population={country.population}
                                    flagUrl={country.flags.png}
                                    isDarkMode={isDarkMode}
                                />
                            </Link>

                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
