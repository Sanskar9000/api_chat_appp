class CreatePrivateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :private_messages do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.text :body

      t.timestamps
    end
  end
end
