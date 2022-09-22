import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function SearchPage(props: {}) {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (searchParams.get('keyword')) {
      setIsSearch(() => true);
    }
    return () => {};
  }, [searchParams]);
  setIsLoading(false);

  return (
    <>
      <div>재료 상세 검색</div>

      <div>검색 결과</div>
    </>
  );
}
