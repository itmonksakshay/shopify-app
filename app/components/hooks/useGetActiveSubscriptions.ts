const useGetActiveSubscriptions = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const getActiveSubscriptions = React.useCallback(async () => {
    try {
    } catch (e) {}
  }, []);
  return { data, isLoading, getActiveSubscriptions };
};
