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
        setAttributes( { featured: false } );
        console.log(attributes)
      }


      return (
          <div style={{ padding: '0.5rem', flex: 1, flexDirection: 'row' }}>
            <ToggleControl
                label="Is Featured Content?"
                help={ attributes.featured ? 'This is featured content.' : 'This is not featured content.' }
                checked={ attributes.featured }
                onChange={ () => updateFeatured(!attributes.featured) }
            />
          </div>
      );
    },

    // No information saved to the block
    // Data is saved to post meta via attributes
    save() {
        return null;
    },
} );
