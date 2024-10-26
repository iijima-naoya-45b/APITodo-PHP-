use App\Http\Controllers\Api\PostController;

Route::get('/posts', [PostController::class, 'index']); // 全ての投稿を取得
Route::post('/posts', [PostController::class, 'store']); // 新しい投稿を作成