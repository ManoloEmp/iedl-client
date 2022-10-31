import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as sections from "../components/sections";
import Fallback from "../components/fallback";
import BannerRecursos from "../components/banner-recursos";
import { useDisclosure } from "@chakra-ui/react";

export default function Homepage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { homepage, allWpMenu, institucional, menuPrincipal } = props.data;

  console.log("data en page", props);

  return (
    <Layout
      {...homepage}
      menu={menuPrincipal}
    >
      {homepage.blocks.map((block, i, arr) => {
        const { id, blocktype, ...componentProps } = block;
        console.log("bloc", blocktype);
        const Component = sections[blocktype] || Fallback;
        return (
          <Component
            key={id}
            {...componentProps}
            menu={blocktype === "HomepageHero"
              ? arr.find((e) => e.blocktype === "MenuPrincipal")
              : ""}
            onOpen={onOpen}
          />
        );
      })}
      <BannerRecursos
        isOpen={isOpen}
        onClose={onClose}
        menu={homepage.blocks.map((block, i, arr) => {
          const { blocktype } = block;

          return blocktype === "HomepageHero"
            ? arr.find((e) => e.blocktype === "MenuPrincipal")
            : "";
        })}
      />
    </Layout>
  );
}

export const query = graphql`
  {
    menuPrincipal{
      id
      fieldGroupName
      inicio {

        fieldGroupName
        tag
      }

      nuestraInstitucion {
        fieldGroupName
        tag
        childs {

          quienesSomos {
            fieldGroupName
            tag
          }
        }
      }

      recursos {
        fieldGroupName
        tag
        childs {
          academicos {
            fieldGroupName
            tag
            childs {
              evaluaciones {
                fieldGroupName
                tag
              }
              educajunto {
                fieldGroupName
                image {
                  id

      

                }


              }
            }

          }
          aprendizaje {
            fieldGroupName
            tag

          }

        }
      }

    }
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageBannerInstitucionalContent
        ...HomepageBannerValoresContent
        ...MenuPrincipalContent


      }
    }




  }
`;

/*

institucional {
  id
  blocks: content {
    id
    blocktype
    ...InstitucionalBannerContent

  }
}

allWpMenu {
edges {
  node {
    name
    menuItems {
      nodes {
        id
        label
        locations
        path
        order
        childItems {
          nodes {
            id
            label
            childItems {
              nodes {
                id
                childItems {
                  nodes {
                    id
                    label
                  }
                }
                label
              }
            }
          }
        }
        cssClasses
      }
    }
  }
}
}

*/
