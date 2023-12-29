type UrlInfo = {
  domain: string;
  port: string;
  path: string;
  query_params: { [key: string]: string };
}

const url_parser = (host: string, url: string): UrlInfo => {
  if (!url) return { domain: '', port: '', path: '', query_params: {} };
  const [domain = '', port = ''] = host.split(':');
  const [path, query] = url.split('?');
  const query_params = query?.split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    return { ...acc, [key]: value };
  }, {});
  return { domain, port, path, query_params };
}

export { url_parser, UrlInfo };
