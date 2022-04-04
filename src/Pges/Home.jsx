import React, { useState, useCallback } from 'react';
import ActorGrid from '../Components/actor/ActorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/ShowGrid';
import { apiGet } from '../misc/Config';
import { useLastQuerry } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = results => {
  if (results && results.length === 0) {
    return <div>No Results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }

  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuerry();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = useCallback(
    event => {
      setInput(event.target.value);
    },
    [setInput]
  );

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(event => {
    setSearchOption(event.target.value);
  }, []);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="What you need?"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
