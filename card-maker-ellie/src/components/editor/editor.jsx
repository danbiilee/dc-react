import React from 'react';
import CardEditForm from '../card-edit-form/card-edit-form';
import styles from './editor.module.css';

const Editor = ({ cards }) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    {cards.map(card => (
      <CardEditForm key={card.id} card={card} />
    ))}
  </section>
);

export default Editor;