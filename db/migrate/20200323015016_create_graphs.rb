class CreateGraphs < ActiveRecord::Migration[5.2]
  def change
    create_table :graphs do |t|
      t.date :date
      t.float :weight
      t.references :user, foreign_key: true

      t.timestamps
    end
    # 一人のユーザーが同じ日付のデータを複数記録できないようにする
    add_index :graphs, [:user_id, :date], unique: true
  end
end
