import { Helmet, HelmetData } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const HeadMetaData = ({
  title = "",
  description = "",
}: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Dashboard RentBQ` : undefined}
      defaultTitle="Dashboard RentBQ"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
