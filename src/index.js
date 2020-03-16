import { registerBlockType } from '@wordpress/blocks';
import { RadioControl } from '@wordpress/components';
import { withState } from '@wordpress/compose';

registerBlockType( 'ironeko/featured-content', {
    title: 'Featured Content',
    icon: 'smiley',
    category: 'common',

    attributes: {
        featured: {
            type: 'boolean',
            source: 'meta',
            meta: 'featured',
        }
    },

    edit( { className, setAttributes, attributes } ) {
      function updateFeatured( {option} ) {
        console.log(`Setting value: ${option}`);
        setAttributes( { featured: option } );
      }

      const FeaturedRadio = withState( {
          option: false,
      } )( ( { option, setState } ) => (
          <RadioControl
              label="User type"
              help="The type of the current user"
              selected={ option }
              options={ [
                  { label: 'True', value: true },
                  { label: 'False', value: false },
              ] }
              onChange={ ( option ) => { setState( { option } ) } }
          />
      ) );

      return (
          <div style={{ padding: '0.5rem', flex: 1, flexDirection: 'row' }}>
            <FeaturedRadio/>
          </div>
      );
    },

    // No information saved to the block
    // Data is saved to post meta via attributes
    save() {
        return null;
    },
} );
