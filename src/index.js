import { registerBlockType } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
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
      function updateFeatured( value ) {
        console.log(`Setting value: ${value}`);
        setAttributes( { featured: value } );
        console.log(attributes)
      }

      const FeaturedRadio = withState( {
          hasFixedBackground: attributes.featured,
      } )( ( { hasFixedBackground, setState } ) => (
          <ToggleControl
              label="Fixed Background"
              help={ hasFixedBackground ? 'Has fixed background.' : 'No fixed background.' }
              checked={ hasFixedBackground }
              onChange={ () => setState( ( state ) => {
                updateFeatured(!state.hasFixedBackground)
                return { hasFixedBackground: ! state.hasFixedBackground }
               } ) }
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
